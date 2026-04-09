// ═══════════════════════════════════════════════════════════════════
//  NAMMA OORU SMART SOLUTIONS — Google Apps Script Backend
//  Paste this entire file into your Apps Script editor.
//  Deploy as: Web App → Execute as: Me → Who has access: Anyone
// ═══════════════════════════════════════════════════════════════════

// ─── CONFIGURATION ────────────────────────────────────────────────
const CONFIG = {
  SPREADSHEET_ID: "1fKKgSXXTNUcPl2YYx-n1sbItg549QgAjWqwAUSmmi_s",
  SECRET_KEY: "NAMMA_OORU_SECRET_2024_XK9",
  SHEETS: {
    PRODUCTS: "Products",
    ORDERS: "Orders",
    ORDER_ITEMS: "Order_Items",
  },
  MAX_CART_ITEMS: 50,
  MAX_STRING_LENGTH: 500,
};

// ─── CORS HEADERS (returned with every response) ──────────────────
function setCorsHeaders(output) {
  return output; // Apps Script handles CORS via deploy settings
}

// ─── MAIN ENTRY: GET ──────────────────────────────────────────────
function doGet(e) {
  try {
    const action = e.parameter.action;
    const secretKey = e.parameter.secret_key;

    // Auth check
    if (!secretKey || secretKey !== CONFIG.SECRET_KEY) {
      return jsonError("Unauthorized", 401);
    }

    switch (action) {
      case "getProducts":
        return getProducts();
      case "getOrders":
        return getOrders();
      case "ping":
        return jsonSuccess({ message: "pong", status: "online" });
      default:
        return jsonError("Unknown action: " + action, 400);
    }
  } catch (err) {
    Logger.log("doGet error: " + err.message);
    return jsonError("Server error: " + err.message, 500);
  }
}

// ─── MAIN ENTRY: POST ─────────────────────────────────────────────
function doPost(e) {
  try {
    // Parse body
    if (!e.postData || !e.postData.contents) {
      return jsonError("Empty request body", 400);
    }

    let data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (_) {
      return jsonError("Invalid JSON body", 400);
    }

    // Auth check
    if (!data.secret_key || data.secret_key !== CONFIG.SECRET_KEY) {
      return jsonError("Unauthorized", 401);
    }

    const action = data.action;
    switch (action) {
      case "createOrder":
        return createOrder(data);
      case "syncProducts":
        return syncProducts(data);
      default:
        return jsonError("Unknown action: " + action, 400);
    }
  } catch (err) {
    Logger.log("doPost error: " + err.message);
    return jsonError("Server error: " + err.message, 500);
  }
}

// ═══════════════════════════════════════════════════════════════════
//  ENDPOINT: createOrder
//  Inserts a new order + its items into the sheet.
// ═══════════════════════════════════════════════════════════════════
function createOrder(data) {
  const { name, phone, cartItems, total } = data;

  // ── Validate ────────────────────────────────────────────────────
  if (!name || !phone) {
    return jsonError("Missing customer name or phone", 400);
  }
  if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
    return jsonError("Cart is empty or invalid", 400);
  }
  if (cartItems.length > CONFIG.MAX_CART_ITEMS) {
    return jsonError("Too many cart items", 400);
  }
  const totalAmount = parseFloat(String(total).replace(/[₹,]/g, "")) || 0;
  if (totalAmount <= 0) {
    return jsonError("Invalid total amount", 400);
  }

  // ── Sanitize ────────────────────────────────────────────────────
  const cleanName  = sanitize(name);
  const cleanPhone = sanitize(phone);

  // Validate phone — must be 10 digits (after stripping non-digits)
  const digitsOnly = cleanPhone.replace(/\D/g, "");
  if (digitsOnly.length < 10) {
    return jsonError("Invalid phone number", 400);
  }

  // ── Generate unique Order ID ─────────────────────────────────────
  const orderId = "ORD-" + Date.now() + "-" + Math.random().toString(36).substr(2, 5).toUpperCase();
  const createdAt = Utilities.formatDate(new Date(), "Asia/Kolkata", "yyyy-MM-dd HH:mm:ss");

  // ── Open Spreadsheet ────────────────────────────────────────────
  const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  const ordersSheet    = ss.getSheetByName(CONFIG.SHEETS.ORDERS);
  const itemsSheet     = ss.getSheetByName(CONFIG.SHEETS.ORDER_ITEMS);

  if (!ordersSheet || !itemsSheet) {
    return jsonError("Sheet not found. Please set up the sheet correctly.", 500);
  }

  // ── Insert into Orders sheet ─────────────────────────────────────
  ordersSheet.appendRow([
    orderId,
    cleanName,
    cleanPhone,
    totalAmount,
    createdAt,
  ]);

  // ── Insert each item into Order_Items sheet ──────────────────────
  cartItems.forEach(function (item) {
    const productId = sanitize(String(item.id || "unknown"));
    const qty       = Math.max(1, parseInt(item.qty || item.quantity || 1));
    const price     = parseFloat(String(item.price || "0").replace(/[₹,]/g, "")) || 0;

    itemsSheet.appendRow([orderId, productId, qty, price]);
  });

  // ── Return success ───────────────────────────────────────────────
  return jsonSuccess({
    order_id: orderId,
    message: "Order saved successfully",
    created_at: createdAt,
    total: totalAmount,
    items_count: cartItems.length,
  });
}

// ═══════════════════════════════════════════════════════════════════
//  ENDPOINT: getProducts
//  Returns all rows from the Products sheet as JSON.
// ═══════════════════════════════════════════════════════════════════
function getProducts() {
  const ss    = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  const sheet = ss.getSheetByName(CONFIG.SHEETS.PRODUCTS);

  if (!sheet) {
    return jsonError("Products sheet not found", 500);
  }

  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) {
    return jsonSuccess({ products: [] });
  }

  const headers  = data[0]; // first row = column headers
  const products = data.slice(1)
    .filter(function (row) { return row[0]; }) // skip empty rows
    .map(function (row) {
      const product = {};
      headers.forEach(function (header, i) {
        product[header] = row[i];
      });
      return product;
    });

  return jsonSuccess({ products: products, count: products.length });
}

// ═══════════════════════════════════════════════════════════════════
//  ENDPOINT: getOrders
//  Returns all orders (for admin review).
// ═══════════════════════════════════════════════════════════════════
function getOrders() {
  const ss         = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  const ordersSheet = ss.getSheetByName(CONFIG.SHEETS.ORDERS);
  const itemsSheet  = ss.getSheetByName(CONFIG.SHEETS.ORDER_ITEMS);

  if (!ordersSheet) return jsonError("Orders sheet not found", 500);

  const ordersData = ordersSheet.getDataRange().getValues();
  if (ordersData.length <= 1) return jsonSuccess({ orders: [] });

  const ordersHeaders = ordersData[0];
  const orders = ordersData.slice(1).filter(function (r) { return r[0]; }).map(function (row) {
    const order = {};
    ordersHeaders.forEach(function (h, i) { order[h] = row[i]; });
    return order;
  });

  // Attach items if items sheet exists
  if (itemsSheet) {
    const itemsData = itemsSheet.getDataRange().getValues();
    if (itemsData.length > 1) {
      const itemsHeaders = itemsData[0];
      const items = itemsData.slice(1).filter(function (r) { return r[0]; }).map(function (row) {
        const item = {};
        itemsHeaders.forEach(function (h, i) { item[h] = row[i]; });
        return item;
      });

      // Group items by order_id
      orders.forEach(function (order) {
        order.items = items.filter(function (item) { return item.order_id === order.order_id; });
      });
    }
  }

  return jsonSuccess({ orders: orders, count: orders.length });
}

// ═══════════════════════════════════════════════════════════════════
//  ENDPOINT: syncProducts
//  Bulk-write products from the React app → Google Sheet.
//  Useful for initial seeding. Clears existing data first.
// ═══════════════════════════════════════════════════════════════════
function syncProducts(data) {
  const products = data.products;
  if (!products || !Array.isArray(products) || products.length === 0) {
    return jsonError("No products provided", 400);
  }

  const ss    = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  const sheet = ss.getSheetByName(CONFIG.SHEETS.PRODUCTS);
  if (!sheet) return jsonError("Products sheet not found", 500);

  // Keep header row, clear data rows
  if (sheet.getLastRow() > 1) {
    sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).clearContent();
  }

  const now = Utilities.formatDate(new Date(), "Asia/Kolkata", "yyyy-MM-dd HH:mm:ss");

  products.forEach(function (p) {
    const price = parseFloat(String(p.price || "0").replace(/[₹,]/g, "")) || 0;
    sheet.appendRow([
      sanitize(String(p.id   || "")),
      sanitize(String(p.name || "")),
      price,
      sanitize(String(p.image || "")),
      parseInt(p.stock || 0),
      now,
    ]);
  });

  return jsonSuccess({ message: "Products synced", count: products.length });
}

// ═══════════════════════════════════════════════════════════════════
//  HELPERS
// ═══════════════════════════════════════════════════════════════════
function sanitize(str) {
  if (typeof str !== "string") str = String(str);
  // Strip HTML tags, trim whitespace, clamp length
  return str.replace(/<[^>]*>/g, "").trim().substring(0, CONFIG.MAX_STRING_LENGTH);
}

function jsonSuccess(payload) {
  const response = Object.assign({ success: true }, payload);
  const output = ContentService.createTextOutput(JSON.stringify(response));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}

function jsonError(message, code) {
  const response = { success: false, error: message, code: code || 400 };
  const output = ContentService.createTextOutput(JSON.stringify(response));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}

// ═══════════════════════════════════════════════════════════════════
//  SHEET SETUP HELPER
//  Run this manually ONCE from the Apps Script editor to create
//  the three sheets with proper headers.
//  Go to: Run → setupSheets
// ═══════════════════════════════════════════════════════════════════
function setupSheets() {
  const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);

  function ensureSheet(name, headers) {
    let sheet = ss.getSheetByName(name);
    if (!sheet) {
      sheet = ss.insertSheet(name);
    }
    // Write header row
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    // Style header
    sheet.getRange(1, 1, 1, headers.length)
      .setBackground("#1e3a5f")
      .setFontColor("#ffffff")
      .setFontWeight("bold");
    sheet.setFrozenRows(1);
    return sheet;
  }

  ensureSheet(CONFIG.SHEETS.PRODUCTS,    ["id", "name", "price", "image", "stock", "updated_at"]);
  ensureSheet(CONFIG.SHEETS.ORDERS,      ["order_id", "customer_name", "phone", "total_amount", "created_at"]);
  ensureSheet(CONFIG.SHEETS.ORDER_ITEMS, ["order_id", "product_id", "quantity", "price"]);

  Logger.log("✅ All sheets created/verified successfully!");
  SpreadsheetApp.getUi().alert("✅ Sheets are ready! Products, Orders, Order_Items tabs created.");
}

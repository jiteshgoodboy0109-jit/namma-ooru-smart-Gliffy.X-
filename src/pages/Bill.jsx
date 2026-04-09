import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  Home,
  CheckCircle2,
  Loader2,
  MessageCircle,
  Share2,
  FileText,
  Bell,
  User,
} from "lucide-react";
import { useRef, useEffect, useState, useCallback } from "react";
import html2pdf from "html2pdf.js";

/* ─────────────────────────────────────────────────────────────
   BILL / INVOICE PAGE
   Flow:
     1) Component mounts → invoice rendered
     2) After 800ms → PDF auto-generated & downloaded
     3) After PDF done → WhatsApp opens for owner (full details)
     4) After 3s gap → WhatsApp opens for customer (confirmation)
     5) User can re-download or share at any time
───────────────────────────────────────────────────────────── */

const S = {
  navy: "#1e3a5f",
  accent: "#10b981",
  dark: "#0f172a",
  muted: "#64748b",
  light: "#f8fafc",
  border: "#e2e8f0",
};

export default function Bill({ cartItems, customerInfo, onBackHome }) {
  const billRef = useRef(null);
  const [invoiceNumber] = useState(
    () => `INV-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`
  );

  const invoiceDate = new Date().toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const customer = customerInfo || { name: "Customer Name", phone: "Phone Number" };
  const OWNER_WA = "918883785516";

  const company = {
    name: "NAMMA OORU SMART SOLUTIONS",
    mobile: "+91 8883785516",
    email: "contact@nammaooru.com",
    website: "www.nammaaooru.com",
  };

  const total = cartItems.reduce((sum, item) => {
    const p = parseFloat(item.price?.replace("₹", "").replace(/,/g, "") || 0);
    return sum + p * (item.quantity || 1);
  }, 0);

  /* ── number to words ── */
  const n2w = (num) => {
    const a = ["","One ","Two ","Three ","Four ","Five ","Six ","Seven ","Eight ","Nine ",
      "Ten ","Eleven ","Twelve ","Thirteen ","Fourteen ","Fifteen ","Sixteen ",
      "Seventeen ","Eighteen ","Nineteen "];
    const b = ["","","Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"];
    if ((num = num.toString()).length > 9) return "overflow";
    const n = ("000000000" + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return "";
    let s = "";
    s += n[1] != 0 ? (a[+n[1]] || b[n[1][0]] + " " + a[n[1][1]]) + "Crore " : "";
    s += n[2] != 0 ? (a[+n[2]] || b[n[2][0]] + " " + a[n[2][1]]) + "Lakh " : "";
    s += n[3] != 0 ? (a[+n[3]] || b[n[3][0]] + " " + a[n[3][1]]) + "Thousand " : "";
    s += n[4] != 0 ? (a[+n[4]] || b[n[4][0]] + " " + a[n[4][1]]) + "Hundred " : "";
    s += n[5] != 0 ? (s ? "and " : "") + (a[+n[5]] || b[n[5][0]] + " " + a[n[5][1]]) : "";
    return s.trim();
  };

  /* ──────────────────────────────────────────────────
     STATUS STEPS
     idle → generating_pdf → pdf_done →
     sending_owner → owner_sent →
     sending_customer → all_done
  ────────────────────────────────────────────────── */
  const [step, setStep] = useState("idle");
  const [pdfBlob, setPdfBlob] = useState(null);

  /* Build WhatsApp messages */
  const ownerMsg = `🔔 *NEW ORDER RECEIVED!*

*NAMMA OORU SMART SOLUTIONS*

━━━━━━━━━━━━━━━━━━━━━━━
*Invoice No :* ${invoiceNumber}
*Date       :* ${invoiceDate}
*Status     :* UNPAID
━━━━━━━━━━━━━━━━━━━━━━━

👤 *Customer Details*
*Name  :* ${customer.name}
*Phone :* ${customer.phone}

━━━━━━━━━━━━━━━━━━━━━━━

📦 *Order Details*

${cartItems.map((it, i) => {
    const price = parseFloat(it.price?.replace("₹","").replace(/,/g,"") || 0);
    const qty   = it.quantity || 1;
    return `${i + 1}. ${it.name}\n   Qty: ${qty}  |  ₹${(price * qty).toLocaleString("en-IN")}`;
  }).join("\n")}

━━━━━━━━━━━━━━━━━━━━━━━

💰 *Total Amount : ₹${total.toLocaleString("en-IN")}*
_In Words: ${n2w(total)} Rupees Only_

━━━━━━━━━━━━━━━━━━━━━━━

😊 *குறிப்பு:*
உங்கள் ஆர்டர் எங்களுக்கு மிகவும் முக்கியமானது.

📞 தயவு செய்து ஆர்டரை உறுதிப்படுத்தவும்.

🙏 நன்றி! மீண்டும் உங்களை சேவை செய்ய எதிர்பார்க்கிறோம்.

💙 உங்கள் நம்பிக்கையே எங்கள் வளர்ச்சி!`.trim();


  const customerMsg = `\`\`\`
✅ ORDER CONFIRMED!

      NAMMA OORU SMART SOLUTIONS
      Smart Energy Solutions

Inv No  : ${invoiceNumber}
Date    : ${invoiceDate}

👤 Billed To : ${customer.name}
📞 Phone     : ${customer.phone}

🛒 YOUR ORDER
${cartItems.map((it, i) => `${i + 1}. ${it.name.substring(0, 28)} — ₹${it.price}`).join("\n")}

💰 TOTAL : ₹${total.toLocaleString("en-IN")}

Your invoice PDF has been saved to your device. 📄
Our team will contact you shortly. 🙏
Queries: ${company.mobile}
\`\`\``.trim();

  /* ── PDF generation helper ── */
  const getPdfOptions = () => ({
    margin: [8, 8, 8, 8],
    filename: `Invoice_${invoiceNumber}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, letterRendering: true, logging: false },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  });

  /* ── AUTO FLOW on mount ── */
  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      // small delay so invoice renders fully
      await delay(900);
      if (cancelled) return;

      // STEP 1 — Generate & download PDF
      setStep("generating_pdf");
      try {
        const blob = await html2pdf()
          .set(getPdfOptions())
          .from(billRef.current)
          .outputPdf("blob");

        if (cancelled) return;
        setPdfBlob(blob);

        // trigger browser download
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `Invoice_${invoiceNumber}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } catch (err) {
        console.error("PDF generation failed", err);
      }

      if (cancelled) return;
      setStep("pdf_done");
      await delay(800);

      // STEP 2 — Notify owner on WhatsApp
      if (cancelled) return;
      setStep("sending_owner");
      window.open(
        `https://wa.me/${OWNER_WA}?text=${encodeURIComponent(ownerMsg)}`,
        "_blank"
      );
      await delay(1000);

      if (cancelled) return;
      setStep("owner_sent");
      await delay(3000);

      // STEP 3 — Notify customer on WhatsApp
      if (cancelled) return;
      setStep("sending_customer");
      const clean = customer.phone.replace(/\D/g, "");
      const custNum = clean.startsWith("91") ? clean : `91${clean}`;
      window.open(
        `https://wa.me/${custNum}?text=${encodeURIComponent(customerMsg)}`,
        "_blank"
      );
      await delay(1000);

      if (!cancelled) setStep("all_done");
    };

    run();
    return () => { cancelled = true; };
  }, []);

  /* ── Manual re-download ── */
  const reDownload = useCallback(() => {
    if (pdfBlob) {
      const url = URL.createObjectURL(pdfBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Invoice_${invoiceNumber}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
      // fallback: re-generate
      html2pdf().set(getPdfOptions()).from(billRef.current).save();
    }
  }, [pdfBlob, invoiceNumber]);

  /* ── Share PDF via Web Share API (works on mobile) ── */
  const sharePDF = useCallback(async () => {
    if (!pdfBlob) return;
    const file = new File([pdfBlob], `Invoice_${invoiceNumber}.pdf`, { type: "application/pdf" });
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          title: `Invoice ${invoiceNumber}`,
          text: `Invoice from Namma Ooru Smart Solutions`,
          files: [file],
        });
      } catch (_) { /* user cancelled */ }
    } else {
      // fallback — just re-download
      reDownload();
    }
  }, [pdfBlob, invoiceNumber, reDownload]);

  /* ─── STEP STATUS CONFIG ─── */
  const steps = [
    {
      id: "pdf",
      icon: FileText,
      color: "#8b5cf6",
      label: {
        idle: "Preparing invoice PDF...",
        generating_pdf: "Generating & downloading PDF...",
        pdf_done: "✓ Invoice PDF downloaded to your device",
        sending_owner: "✓ Invoice PDF downloaded",
        owner_sent: "✓ Invoice PDF downloaded",
        sending_customer: "✓ Invoice PDF downloaded",
        all_done: "✓ Invoice PDF downloaded",
      },
      done: ["pdf_done","sending_owner","owner_sent","sending_customer","all_done"],
      active: ["generating_pdf"],
    },
    {
      id: "owner",
      icon: Bell,
      color: "#f59e0b",
      label: {
        idle: "",
        generating_pdf: "",
        pdf_done: "Opening Owner WhatsApp...",
        sending_owner: "Sending order to owner...",
        owner_sent: "✓ Owner notified on WhatsApp",
        sending_customer: "✓ Owner notified on WhatsApp",
        all_done: "✓ Owner notified on WhatsApp",
      },
      done: ["owner_sent","sending_customer","all_done"],
      active: ["pdf_done","sending_owner"],
      visible: ["pdf_done","sending_owner","owner_sent","sending_customer","all_done"],
    },
    {
      id: "customer",
      icon: User,
      color: "#3b82f6",
      label: {
        idle: "",
        generating_pdf: "",
        pdf_done: "",
        sending_owner: "",
        owner_sent: "Preparing your WhatsApp confirmation...",
        sending_customer: "Sending invoice confirmation to you...",
        all_done: "✓ Your WhatsApp confirmation sent",
      },
      done: ["all_done"],
      active: ["owner_sent","sending_customer"],
      visible: ["owner_sent","sending_customer","all_done"],
    },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#eef2f7", padding: "0", fontFamily: "'Segoe UI', Roboto, Arial, sans-serif" }}>

      {/* ── TOP ACTION BAR ── */}
      <div style={{ background: "white", borderBottom: "1px solid #e2e8f0", padding: "14px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", flexWrap: "wrap", position: "sticky", top: 0, zIndex: 50, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "36px", height: "36px", background: "#f0fdf4", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <FileText size={18} style={{ color: "#16a34a" }} />
          </div>
          <div>
            <div style={{ fontSize: "14px", fontWeight: "800", color: S.dark }}>Invoice #{invoiceNumber}</div>
            <div style={{ fontSize: "11px", color: S.muted }}>{invoiceDate}</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <button
            onClick={reDownload}
            style={{ display: "flex", alignItems: "center", gap: "6px", padding: "9px 18px", background: S.navy, color: "white", border: "none", borderRadius: "9px", fontWeight: "700", fontSize: "13px", cursor: "pointer" }}
          >
            <Download size={15} /> Download PDF
          </button>
          {pdfBlob && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={sharePDF}
              style={{ display: "flex", alignItems: "center", gap: "6px", padding: "9px 18px", background: "#25D366", color: "white", border: "none", borderRadius: "9px", fontWeight: "700", fontSize: "13px", cursor: "pointer" }}
            >
              <Share2 size={15} /> Share PDF
            </motion.button>
          )}
          <button
            onClick={onBackHome}
            style={{ display: "flex", alignItems: "center", gap: "6px", padding: "9px 18px", background: "white", color: S.dark, border: "1px solid #e2e8f0", borderRadius: "9px", fontWeight: "600", fontSize: "13px", cursor: "pointer" }}
          >
            <Home size={15} /> Home
          </button>
        </div>
      </div>

      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "24px 16px" }}>

        {/* ── STATUS TRACKER ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ background: "white", borderRadius: "16px", padding: "20px 24px", marginBottom: "24px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #e2e8f0" }}
        >
          <div style={{ fontSize: "11px", fontWeight: "800", color: S.muted, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "16px" }}>
            📋 ORDER STATUS
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {steps.map((s) => {
              const isVisible = !s.visible || s.visible.includes(step);
              const isDone = s.done.includes(step);
              const isActive = s.active.includes(step);
              const label = s.label[step];
              if (!isVisible || !label) return null;
              const Icon = s.icon;
              return (
                <AnimatePresence key={s.id}>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 14px", background: isDone ? "#f0fdf4" : isActive ? "#fefce8" : "#f8fafc", borderRadius: "10px", border: `1px solid ${isDone ? "#bbf7d0" : isActive ? "#fde68a" : "#e2e8f0"}` }}
                  >
                    <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: isDone ? "#dcfce7" : isActive ? "#fef3c7" : "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {isDone
                        ? <CheckCircle2 size={16} style={{ color: "#16a34a" }} />
                        : isActive
                        ? <Loader2 size={16} style={{ color: s.color, animation: "spin 1s linear infinite" }} />
                        : <Icon size={14} style={{ color: S.muted }} />}
                    </div>
                    <span style={{ fontSize: "13px", fontWeight: isDone ? "600" : "500", color: isDone ? "#15803d" : isActive ? "#92400e" : S.muted }}>
                      {label}
                    </span>
                  </motion.div>
                </AnimatePresence>
              );
            })}
          </div>

          {/* All done banner */}
          <AnimatePresence>
            {step === "all_done" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ marginTop: "16px", background: "linear-gradient(135deg, #065f46, #1e3a5f)", borderRadius: "12px", padding: "14px 20px", display: "flex", alignItems: "center", gap: "12px" }}
              >
                <div style={{ fontSize: "22px" }}>🎉</div>
                <div>
                  <div style={{ color: "white", fontWeight: "800", fontSize: "14px" }}>All done! Order processed successfully.</div>
                  <div style={{ color: "#a7f3d0", fontSize: "12px", marginTop: "2px" }}>PDF saved · Owner notified · Your confirmation sent</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ══════════════ INVOICE DOCUMENT ══════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          style={{ background: "white", boxShadow: "0 8px 40px rgba(0,0,0,0.10)", maxWidth: "210mm", margin: "0 auto", overflow: "hidden" }}
        >
          <div ref={billRef} style={{ fontFamily: "'Segoe UI', Arial, sans-serif" }}>

            {/* TOP GRADIENT BAR */}
            <div style={{ height: "6px", background: `linear-gradient(90deg, ${S.navy} 0%, ${S.accent} 100%)` }} />

            {/* HEADER */}
            <div style={{ background: S.navy, padding: "28px 40px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                {/* Logo + Name */}
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={{ background: "white", borderRadius: "10px", padding: "6px 8px", display: "inline-flex" }}>
                    <img
                      src="/logo_new.png"
                      alt="Logo"
                      crossOrigin="anonymous"
                      style={{ height: "58px", width: "auto", objectFit: "contain", display: "block" }}
                    />
                  </div>
                  <div>
                    <div style={{ color: "white", fontSize: "19px", fontWeight: "900", letterSpacing: "0.5px" }}>NAMMA OORU</div>
                    <div style={{ color: S.accent, fontSize: "11px", fontWeight: "800", letterSpacing: "3px", textTransform: "uppercase" }}>SMART SOLUTIONS</div>
                    <div style={{ color: "#94a3b8", fontSize: "10px", marginTop: "3px" }}>Smart Energy Partner · Tamil Nadu</div>
                  </div>
                </div>
                {/* Invoice Label */}
                <div style={{ textAlign: "right" }}>
                  <div style={{ color: S.accent, fontSize: "34px", fontWeight: "900", letterSpacing: "3px", lineHeight: 1 }}>INVOICE</div>
                  <div style={{ color: "#cbd5e1", fontSize: "12px", marginTop: "8px", fontWeight: "600" }}>#{invoiceNumber}</div>
                  <div style={{ color: "#64748b", fontSize: "11px", marginTop: "3px" }}>{invoiceDate}</div>
                </div>
              </div>
            </div>

            {/* CONTACT BAR */}
            <div style={{ background: "#0f172a", padding: "8px 40px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "6px" }}>
              <span style={{ color: "#94a3b8", fontSize: "11px" }}>📞 {company.mobile}</span>
              <span style={{ color: "#94a3b8", fontSize: "11px" }}>✉ {company.email}</span>
              <span style={{ color: S.accent, fontSize: "11px", fontWeight: "700" }}>🌐 {company.website}</span>
            </div>

            {/* BILLED TO + INVOICE DETAILS */}
            <div style={{ display: "flex", borderBottom: `1px solid ${S.border}` }}>
              <div style={{ flex: 1, padding: "26px 40px", borderRight: `1px solid ${S.border}` }}>
                <div style={{ fontSize: "10px", fontWeight: "800", color: S.accent, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "12px" }}>▸ BILLED TO</div>
                <div style={{ fontSize: "17px", fontWeight: "800", color: S.dark, marginBottom: "4px" }}>{customer.name}</div>
                <div style={{ fontSize: "13px", color: S.muted }}>📞 {customer.phone}</div>
                <div style={{ marginTop: "12px", display: "inline-block", padding: "4px 12px", background: "#fef3c7", color: "#b45309", fontSize: "10px", fontWeight: "800", borderRadius: "99px" }}>
                  ● PAYMENT PENDING
                </div>
              </div>
              <div style={{ width: "228px", padding: "26px 30px", background: S.light, flexShrink: 0 }}>
                <div style={{ fontSize: "10px", fontWeight: "800", color: S.accent, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "14px" }}>▸ INVOICE DETAILS</div>
                <table style={{ width: "100%", fontSize: "12px", borderCollapse: "collapse" }}>
                  <tbody>
                    {[["Invoice No.", `#${invoiceNumber}`], ["Issue Date", invoiceDate], ["Items", `${cartItems.length} item${cartItems.length !== 1 ? "s" : ""}`]].map(([l, v]) => (
                      <tr key={l}>
                        <td style={{ color: S.muted, paddingBottom: "8px", paddingRight: "8px" }}>{l}</td>
                        <td style={{ color: S.dark, fontWeight: "700", paddingBottom: "8px", textAlign: "right" }}>{v}</td>
                      </tr>
                    ))}
                    <tr>
                      <td style={{ color: S.muted }}>Status</td>
                      <td style={{ textAlign: "right" }}>
                        <span style={{ background: "#fef2f2", color: "#dc2626", fontSize: "10px", fontWeight: "800", padding: "2px 10px", borderRadius: "99px" }}>UNPAID</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* ITEMS TABLE */}
            <div style={{ padding: "30px 40px 0" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: S.navy }}>
                    {[["#", "left", "36px"], ["Product Description", "left", "auto"], ["Qty", "center", "60px"], ["Unit Price", "right", "110px"], ["Amount", "right", "110px"]].map(([h, align, w]) => (
                      <th key={h} style={{ padding: "11px 14px", textAlign: align, color: h === "Amount" ? S.accent : "white", fontSize: "10px", fontWeight: "700", letterSpacing: "1.5px", textTransform: "uppercase", width: w }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, i) => {
                    const price = parseFloat(item.price?.replace("₹", "").replace(/,/g, "") || 0);
                    const qty = item.quantity || 1;
                    return (
                      <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#f8fafc", borderBottom: `1px solid ${S.border}` }}>
                        <td style={{ padding: "14px 14px", color: "#94a3b8", fontSize: "12px", fontWeight: "700" }}>{String(i + 1).padStart(2, "0")}</td>
                        <td style={{ padding: "14px 14px" }}>
                          <div style={{ fontSize: "13px", fontWeight: "700", color: S.dark }}>{item.name}</div>
                          {item.category && <div style={{ fontSize: "11px", color: S.muted, marginTop: "2px" }}>{item.category}</div>}
                        </td>
                        <td style={{ padding: "14px 14px", textAlign: "center", fontSize: "13px", color: "#475569", fontWeight: "600" }}>{qty}</td>
                        <td style={{ padding: "14px 14px", textAlign: "right", fontSize: "13px", color: "#475569", fontWeight: "600" }}>₹{price.toLocaleString("en-IN")}</td>
                        <td style={{ padding: "14px 14px", textAlign: "right", fontSize: "13px", fontWeight: "800", color: S.dark }}>₹{(price * qty).toLocaleString("en-IN")}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* TOTAL + AMOUNT IN WORDS */}
            <div style={{ padding: "0 40px 30px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "24px" }}>
              <div style={{ flex: 1, paddingTop: "24px" }}>
                <div style={{ fontSize: "10px", fontWeight: "700", color: S.muted, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "8px" }}>Amount in Words</div>
                <div style={{ fontSize: "12px", color: S.dark, fontWeight: "600", fontStyle: "italic", background: "#f1f5f9", padding: "10px 14px", borderRadius: "8px", borderLeft: `4px solid ${S.accent}` }}>
                  {n2w(total)} Rupees Only
                </div>
              </div>
              <div style={{ minWidth: "228px", paddingTop: "24px" }}>
                <div style={{ borderTop: `1px solid ${S.border}`, paddingTop: "14px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ fontSize: "12px", color: S.muted }}>Subtotal</span>
                    <span style={{ fontSize: "12px", fontWeight: "600", color: S.dark }}>₹{total.toLocaleString("en-IN")}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "14px" }}>
                    <span style={{ fontSize: "12px", color: S.muted }}>GST / Tax</span>
                    <span style={{ fontSize: "12px", fontWeight: "600", color: S.dark }}>₹0.00</span>
                  </div>
                  <div style={{ background: S.navy, borderRadius: "10px", padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "13px", fontWeight: "700", color: "white" }}>TOTAL PAYABLE</span>
                    <span style={{ fontSize: "20px", fontWeight: "900", color: S.accent }}>₹{total.toLocaleString("en-IN")}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* DIVIDER */}
            <div style={{ height: "1px", background: S.border, margin: "0 40px" }} />

            {/* SIGNATURE + TERMS */}
            <div style={{ padding: "26px 40px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "32px" }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "10px", fontWeight: "700", color: S.muted, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "8px" }}>Terms & Conditions</div>
                <div style={{ fontSize: "10px", color: "#94a3b8", lineHeight: "1.8" }}>
                  • Goods once sold will not be taken back.<br />
                  • Warranty as per manufacturer terms.<br />
                  • This is a computer-generated invoice.
                </div>
              </div>
              <div style={{ textAlign: "center", minWidth: "170px" }}>
                <div style={{ height: "38px" }} />
                <div style={{ borderTop: "1.5px solid #0f172a", paddingTop: "8px" }}>
                  <div style={{ fontSize: "11px", fontWeight: "800", color: S.dark }}>Authorised Signatory</div>
                  <div style={{ fontSize: "10px", color: S.muted, marginTop: "2px" }}>Namma Ooru Smart Solutions</div>
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div style={{ background: S.navy, padding: "13px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "6px" }}>
              <span style={{ color: "#94a3b8", fontSize: "10px" }}>Thank you for your business! 🙏</span>
              <span style={{ color: S.accent, fontSize: "10px", fontWeight: "700" }}>{company.website}</span>
              <span style={{ color: "#64748b", fontSize: "10px" }}>Page 1 of 1</span>
            </div>

          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* tiny async delay helper */
function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

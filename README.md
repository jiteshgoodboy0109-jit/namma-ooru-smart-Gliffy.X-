# Namma Ooru Smart Solutions - Website Guide

Welcome! This guide is designed to help you easily manage and edit the website. You don't need to be an expert coder to make changes. Just follow the instructions below.

## 🚀 How to Start the Website
1. **Open the Terminal**: Open your command prompt (cmd) or VS Code terminal in the project folder.
2. **Run the Command**: Type the following command and press Enter:
   ```bash
   npm run dev
   ```
3. **Open in Browser**: You will see a link (usually `http://localhost:5173/`). Ctrl+Click it to open the website.

---

## 📦 Project Structure
Here are the most important files you will need to edit:

- **`public/products.js`**: Contains all the products displayed on the website. **(Edit this to add/remove products)**.
- **`public/` folder**: Place all your images here.
- **`src/components/Navbar.jsx`**: Edit this to change the **Logo** or **Menu** names.
- **`src/components/ContactSection.jsx`**: Edit this to change **Address, Phone Numbers, and Email**.
- **`src/components/Footer.jsx`**: Edit this to change the bottom footer links and copyright info.

---

## 🛒 How to Add a New Product
1. Open `public/products.js`.
2. Scroll to the top, where you will see a **Template**.
3. Copy the template and paste it inside the `window.PRODUCTS` list.
4. Fill in the details:
   - **id**: A unique name (e.g., `'iphone-15'`). No spaces!
   - **name**: The display name (e.g., `'iPhone 15'`).
   - **price**: Selling price (e.g., `'₹75,000'`).
   - **mrp**: Original price (e.g., `'₹80,000'`).
   - **image**: Path to the image (e.g., `'/your-image.jpg'`).
5. Save the file. The website will update automatically!

---

## 🖼️ How to Change the Logo
1. Put your new logo image in the `public/` folder.
2. Open `src/components/Navbar.jsx`.
3. Look for this line near the top:
   ```javascript
   const logo = '/your-logo-name.png'
   ```
4. Change the filename to your new logo's name.

---

## 📞 How to Edit Contact Details
1. Open `src/components/ContactSection.jsx`.
2. Scroll down to find the **Address**, **Phone**, and **Email** sections.
3. Change the text inside the quotes `'...'` to update them.

---

## 🎨 Changing Colors
The website uses **Tailwind CSS**. 
- To change text colors, look for classes like `text-red-500` or `text-blue-600`.
- To change background colors, look for classes like `bg-slate-900` or `bg-white`.

---

### Need Help?
If something breaks, you can generally undo your last change by pressing `Ctrl + Z`.

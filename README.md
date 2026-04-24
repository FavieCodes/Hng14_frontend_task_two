# Invoice Management App

A full-featured invoice management application built with React that allows users to create, read, update, and delete invoices with form validation, dark/light mode, and responsive design.

## 🚀 Live Demo

[https://hng14-frontend-task-two.vercel.app/]

## 📋 Features

### Core Functionality
- ✅ **Create Invoices** - Fill out a comprehensive form to create new invoices
- ✅ **Read Invoices** - View all invoices in a list or detailed view
- ✅ **Update Invoices** - Edit existing invoice information
- ✅ **Delete Invoices** - Remove invoices with confirmation modal
- ✅ **Save Drafts** - Save incomplete invoices as drafts for later editing
- ✅ **Mark as Paid** - Change invoice status from pending to paid
- ✅ **Filter by Status** - Filter invoices by draft, pending, or paid status

### User Experience
- 🌓 **Dark/Light Mode** - Toggle between themes with saved preference
- 📱 **Fully Responsive** - Works perfectly on mobile, tablet, and desktop
- ✨ **Hover States** - Visual feedback on all interactive elements
- ♿ **Accessibility** - Keyboard navigation, focus trap, ARIA labels
- 💾 **Persistent Storage** - Data saved in localStorage

### Form Validation
- Client name is required
- Valid email format required
- At least one invoice item required
- Quantity and price must be positive numbers
- Visual error states with messages

## 🛠️ Technologies Used

- **React 18** - UI Framework
- **CSS3** - Styling with CSS variables for theming
- **LocalStorage** - Data persistence
- **React Hooks** - State management (useState, useEffect, useContext)

## 📁 Project Structure
```
invoice-app/
├── public/
│ └── index.html
│ └── profile.png
│ └── emptyIllustration.png
├── src/
│ ├── components/
│ │ ├── InvoiceForm/
│ │ │ ├── InvoiceForm.js
│ │ │ └── InvoiceForm.css
│ │ ├── InvoiceList/
│ │ │ ├── InvoiceList.js
│ │ │ └── InvoiceList.css
│ │ ├── InvoiceDetail/
│ │ │ ├── InvoiceDetail.js
│ │ │ └── InvoiceDetail.css
│ │ ├── StatusBadge/
│ │ │ ├── StatusBadge.js
│ │ │ └── StatusBadge.css
│ │ ├── Sidebar/
│ │ │ ├── Sidebar.js
│ │ │ └── Sidebar.css
│ │ ├── Filter/
│ │ │ ├── Filter.js
│ │ │ └── Filter.css
│ │ ├── Modal/
│ │ │ ├── Modal.js
│ │ │ └── Modal.css
│ │ └── ThemeToggle/
│ │ ├── ThemeToggle.js
│ │ └── ThemeToggle.css
│ ├── context/
│ │ └── ThemeContext.js
│ ├── hooks/
│ │ └── useInvoices.js
│ ├── App.js
│ ├── App.css
│ └── index.js
├── package.json
└── README.md


```

## 🚦 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/FavieCodes/Hng14_frontend_task_two
cd Hng14_frontend_task_two
Install dependencies

bash
npm install
Start the development server

bash
npm start
Open your browser

text
http://localhost:3000
📖 Usage Guide
Creating an Invoice
Click the "New Invoice" button in the top right
Fill in the form with:
Sender and client addresses
Client name and email
Invoice date and payment terms
Item details (name, quantity, price)
Click "Save & Send" to create a pending invoice
Click "Save as Draft" to save an incomplete invoice
Managing Invoices
View Details: Click on any invoice in the list
Edit: Click the "Edit" button in the detail view
Delete: Click "Delete" and confirm in the modal
Mark as Paid: Click "Mark as Paid" (only for pending invoices)
Filtering Invoices
Click the "Filter by status" button
Check/uncheck status options (Draft, Pending, Paid)
The invoice list updates immediately
Dark/Light Mode
Click the theme toggle button (sun/moon icon) in the header
Your preference is saved and persists after page reload
```

## 🎨 Color Scheme
Light Mode
Background: #F8F8FB
Card Background: #FFFFFF
Text Primary: #0C0E16
Text Secondary: #888EB0
Primary Color: #7C5DFA
Dark Mode
Background: #141625
Card Background: #1E2139
Text Primary: #FFFFFF
Text Secondary: #DFE3FA
Primary Color: #7C5DFA
Status Colors
Paid: Green (#33D69F)
Pending: Orange (#FF8F00)
Draft: Dark/Light gray based on theme

## 📱 Responsive Breakpoints
Mobile: 320px - 767px
Tablet: 768px - 1023px
Desktop: 1024px and above

## ♿ Accessibility Features
Semantic HTML structure
ARIA labels on interactive elements
Keyboard navigation support
Focus trapping in modals (ESC to close)
Proper color contrast (WCAG AA compliant)
Form fields with associated labels
Buttons are actual <button> elements

## 🔧 Available Scripts
Command	Description
npm start	Runs the app in development mode
npm run build	Builds the app for production
npm test	Launches the test runner
npm run eject	Ejects from Create React App

## 🧪 Testing the Application
Manual Test Cases
Create Invoice
Try submitting with empty fields → Should show validation errors
Fill all fields correctly → Invoice should appear in list
Edit Invoice
Change client name → Updates should persist
Try invalid email → Should show error
Delete Invoice
Click delete → Modal should appear
Cancel → Invoice remains
Confirm → Invoice disappears
Filter Invoices
Select "Paid" only → Only paid invoices shown
Select multiple statuses → Shows all selected
Dark Mode
Toggle theme → Colors change globally
Refresh page → Theme preference maintained

## 🐛 Known Issues
None currently. Report issues on GitHub.

## 🔜 Future Enhancements
Backend API integration
User authentication
Email invoice sending
PDF export functionality
Recurring invoices
Payment gateway integration
Dashboard with analytics
Multi-currency support

## 🤝 Contributing
Fork the repository
Create your feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request

##📄 License
This project is licensed under the MIT License - see the LICENSE file for details

## 👏 Acknowledgments
Design inspiration from Frontend Mentor
Icons from Feather Icons
Font system from system default fonts

## 📞 Contact
Imo Emmanuel  - imo.e.udoh@gmail.com

Project Link: https://github.com/FavieCodes/Hng14_frontend_task_two

## 🎯 Acceptance Criteria Checklist
CRUD functionality works completely
Form validation prevents invalid submissions
Status logic (draft → pending → paid) works correctly
Filtering updates list accurately
Theme toggle persists across reloads
Fully responsive on all devices
Clean component structure with proper separation
No console errors in development
Good accessibility practices implemented
Hover states on all interactive elements
Modal with proper focus management
Data persistence with localStorage


## 🚀 Deployment
Deploy to Vercel
bash
npm install -g vercel
vercel



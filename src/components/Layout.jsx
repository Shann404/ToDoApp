import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Card from "./Card";
const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Navbar always visible */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl mx-auto w-full py-6 px-4 sm:px-6 lg:px-8">
        <Card className="shadow-lg rounded-2xl bg-white dark:bg-gray-800">
          {children}
        </Card>
      </main>

      {/* Footer always visible */}
      <Footer />
    </div>
  );
};

export default Layout;

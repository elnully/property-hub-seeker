
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Building2, 
  PlusCircle, 
  User, 
  Menu, 
  X 
} from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b shadow-sm py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">PropertyHub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link to="/properties" className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors">
              <Building2 className="h-4 w-4" />
              <span>Properties</span>
            </Link>
            <Link to="/add-property" className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors">
              <PlusCircle className="h-4 w-4" />
              <span>List Property</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link to="/login">
              <Button variant="outline" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button className="flex items-center gap-2">
                Register
              </Button>
            </Link>
          </div>

          {/* Mobile Navigation Toggle */}
          <button 
            className="md:hidden p-2" 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 py-4 border-t animate-fade-in">
            <div className="flex flex-col gap-4">
              <Link 
                to="/" 
                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
                onClick={() => setIsOpen(false)}
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
              <Link 
                to="/properties" 
                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
                onClick={() => setIsOpen(false)}
              >
                <Building2 className="h-4 w-4" />
                <span>Properties</span>
              </Link>
              <Link 
                to="/add-property" 
                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
                onClick={() => setIsOpen(false)}
              >
                <PlusCircle className="h-4 w-4" />
                <span>List Property</span>
              </Link>
              <div className="flex flex-col gap-2 mt-4 pt-4 border-t">
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full justify-start">
                    <User className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setIsOpen(false)}>
                  <Button className="w-full justify-start">
                    Register
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

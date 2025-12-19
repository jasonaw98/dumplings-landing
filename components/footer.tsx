import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12">
          <div>
            <Link
              href="/"
              className="text-2xl font-bold text-orange-500 mb-6 block"
            >
              Happy Dumplings
            </Link>
            <p className="text-gray-400">
              Spreading joy, one dumpling at a time. Come say hi!
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-gray-400">
              <li>
                <Link
                  href="#menu"
                  className="hover:text-orange-500 transition-colors"
                >
                  Menu
                </Link>
              </li>
              <li>
                <Link
                  href="#story"
                  className="hover:text-orange-500 transition-colors"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  href="#locations"
                  className="hover:text-orange-500 transition-colors"
                >
                  Locations
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-orange-500 transition-colors"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Contact</h4>
            <ul className="space-y-4 text-gray-400">
              <li>hello@happydumplings.com</li>
              <li>(555) 123-4567</li>
              <li>123 Dumpling Lane, Food City</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-500 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-500 transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-500 transition-colors"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-16 pt-8 text-center text-gray-500">
          <p>
            © {new Date().getFullYear()} Happy Dumplings. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

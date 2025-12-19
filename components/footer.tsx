import Link from "next/link";
import { Facebook, Instagram } from "./icons/Icons";

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
              Dumpling Bois
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
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Contact</h4>
            <ul className="space-y-4 text-gray-400">
              <li>hello@dumplingbois.com</li>
              <li>+60 10-822 7137</li>
              <li>277, Jln Parameswara, 75000 Melaka</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/dumpling.bois/"
                target="_blank"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-500 transition-colors"
              >
                <Instagram className="size-5"/>
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61580374323144&mibextid=wwXIfr&rdid=8WvdYsQ7RUhZ8i2v"
                target="_blank"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-500 transition-colors"
              >
                <Facebook className="size-5"/>
              </a>
              <a
                href="https://api.whatsapp.com/send/?phone=600108227137&text&type=phone_number"
                target="_blank"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-500 transition-colors"
              >
                <svg fill="none" viewBox="0 0 360 362" className="size-5">
                  <path
                    fill="#25D366"
                    fillRule="evenodd"
                    d="M307.546 52.566C273.709 18.684 228.706.017 180.756 0 81.951 0 1.538 80.404 1.504 179.235c-.017 31.594 8.242 62.432 23.928 89.609L0 361.736l95.024-24.925c26.179 14.285 55.659 21.805 85.655 21.814h.077c98.788 0 179.21-80.413 179.244-179.244.017-47.898-18.608-92.926-52.454-126.807v-.008Zm-126.79 275.788h-.06c-26.73-.008-52.952-7.194-75.831-20.765l-5.44-3.231-56.391 14.791 15.05-54.981-3.542-5.638c-14.912-23.721-22.793-51.139-22.776-79.286.035-82.14 66.867-148.973 149.051-148.973 39.793.017 77.198 15.53 105.328 43.695 28.131 28.157 43.61 65.596 43.593 105.398-.035 82.149-66.867 148.982-148.982 148.982v.008Zm81.719-111.577c-4.478-2.243-26.497-13.073-30.606-14.568-4.108-1.496-7.09-2.243-10.073 2.243-2.982 4.487-11.568 14.577-14.181 17.559-2.613 2.991-5.226 3.361-9.704 1.117-4.477-2.243-18.908-6.97-36.02-22.226-13.313-11.878-22.304-26.54-24.916-31.027-2.613-4.486-.275-6.91 1.959-9.136 2.011-2.011 4.478-5.234 6.721-7.847 2.244-2.613 2.983-4.486 4.478-7.469 1.496-2.991.748-5.603-.369-7.847-1.118-2.243-10.073-24.289-13.812-33.253-3.636-8.732-7.331-7.546-10.073-7.692-2.613-.13-5.595-.155-8.586-.155-2.991 0-7.839 1.118-11.947 5.604-4.108 4.486-15.677 15.324-15.677 37.361s16.047 43.344 18.29 46.335c2.243 2.991 31.585 48.225 76.51 67.632 10.684 4.615 19.029 7.374 25.535 9.437 10.727 3.412 20.49 2.931 28.208 1.779 8.604-1.289 26.498-10.838 30.228-21.298 3.73-10.46 3.73-19.433 2.613-21.298-1.117-1.865-4.108-2.991-8.586-5.234l.008-.017Z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-16 pt-8 text-center text-gray-500">
          <p>
            © {new Date().getFullYear()} Dumpling Bois. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}


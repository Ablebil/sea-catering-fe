const Footer = () => {
  return (
    <footer className="bg-green-900 text-green-100 py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        <div>
          <h4 className="text-lg font-semibold mb-2">Contact Us</h4>

          <div className="flex gap-1">
            <p className="w-15 font-medium">Manager</p>
            <p>:</p>
            <p>Brian</p>
          </div>

          <div className="flex gap-1">
            <p className="w-15 font-medium">Phone</p>
            <p>:</p>
            <p>08123456789</p>
          </div>

          <div className="flex gap-1">
            <p className="w-15 font-medium">Email</p>
            <p>:</p>
            <p>info@seacatering.id</p>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1">
            <li>
              <a href="#" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Menu
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Subscription Plans
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-2">Follow Us</h4>
          <ul className="space-y-1">
            <li>
              <a href="#" className="hover:underline">
                Instagram
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Facebook
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Twitter
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center text-xs text-green-300 mt-6">
        &copy; {new Date().getFullYear()} SEA Catering. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

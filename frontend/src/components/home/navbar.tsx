import { cn } from "@/lib/utils";
import { useState } from "react";
import { Menu, MenuItem, HoveredLink, ProductItem } from "../ui/navbar-menu";
import { Link } from "react-router";
import { Menu as IconMenu, X } from "lucide-react"; // Icons for mobile menu
import { Button } from "../ui/moving-border";

export function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState<boolean>(false); // Mobile menu state

  return (
    <div
      className={cn(
        "absolute  top-6 inset-x-0 sm:max-w-5xl w-full mx-auto z-50",
        className
      )}
    >
      <nav
        onMouseLeave={() => setActive(null)}
        className="relative flex items-center justify-between rounded-full border dark:bg-black dark:border-white/[0.2] bg-white shadow-input px-5 py-1 md:space-x-4"
      >
        {/* Brand Name */}
        <Link to="/" className="text-xl font-bold text-black dark:text-white">
          Uptime
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-3">
          <Menu setActive={setActive}>
            <MenuItem setActive={setActive} active={active} item="Products">
              <div className="text-sm grid grid-cols-2 gap-10 p-4">
                <ProductItem
                  title="Monitoring"
                  href="/"
                  description="Monitor your website and API."
                />
                <ProductItem
                  title="Alerting"
                  href="/"
                  description="Alerting for your website and API."
                />
                <ProductItem
                  title="Status Page"
                  href="/"
                  description="Status page for your website and API."
                />
              </div>
            </MenuItem>
            <MenuItem setActive={setActive} active={active} item="Resources">
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="/">Blog</HoveredLink>
                <HoveredLink href="/">Changelog</HoveredLink>
                <HoveredLink href="/">Docs</HoveredLink>
                <HoveredLink href="/">About</HoveredLink>
              </div>
            </MenuItem>
            <MenuItem setActive={setActive} active={active} item="Pricing">
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="/">Hobby</HoveredLink>
                <HoveredLink href="/">Individual</HoveredLink>
                <HoveredLink href="/">Team</HoveredLink>
              </div>
            </MenuItem>
          </Menu>
        </div>

        {/* Dashboard Button */}
        <div className="flex items-center space-x-4">
          <Button variant="outline">Get Started</Button>
          <button
            className="block md:hidden text-black dark:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <IconMenu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-black border-t dark:border-white/[0.2] p-4 shadow-md">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/">Products</HoveredLink>
            <HoveredLink href="/">Resources</HoveredLink>
            <HoveredLink href="/">Pricing</HoveredLink>
          </div>
        </div>
      )}
    </div>
  );
}

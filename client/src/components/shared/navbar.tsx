import { Link, useLocation } from "react-router";
import classNames from "classnames";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ThemeToggle } from "@/components/shared/theme-toggle";

export const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <div className="flex justify-between items-center py-4 mb-5">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link
                className={classNames({ "font-bold": pathname === "/" })}
                to="/"
              >
                Home
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link
                className={classNames({
                  "font-bold": pathname === "/favorites",
                })}
                to="/favorites"
              >
                Favorites
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <ThemeToggle />
    </div>
  );
};

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThLarge,
  faGraduationCap,
  faCalendarAlt,
  faVideo,
  faUser,
  faUsers,
  faCog,
  faQuestionCircle,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { DownloadApp } from "./DownloadApp";

const menuGroups = [
  {
    title: "MENU",
    items: [
      { name: "Dashboard", icon: faThLarge, href: "/" },
      {
        name: "Courses",
        icon: faGraduationCap,
        href: "/courses",
        active: true,
      },
      { name: "Calendar", icon: faCalendarAlt, href: "/calendar" },
      { name: "Live Class", icon: faVideo, href: "/live" },
    ],
  },
  {
    title: "GENERAL",
    items: [
      { name: "Profile", icon: faUser, href: "/profile" },
      { name: "Team", icon: faUsers, href: "/team" },
      { name: "Settings", icon: faCog, href: "/settings" },
      { name: "Help Center", icon: faQuestionCircle, href: "/help" },
    ],
  },
];

export const AsideMenu = () => {
  return (
    <aside className="w-64 h-full bg-white rounded-4xl flex flex-col p-6 shadow-sm">
      <div className="flex-1 flex flex-col justify-between">
        <div className="space-y-8">
          {menuGroups.map((group) => (
            <div key={group.title} className="space-y-4">
              <h3 className="text-[10px] font-bold text-secondary-300 tracking-[0.15em] px-4 uppercase">
                {group.title}
              </h3>
              <nav className="space-y-1">
                {group.items.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`relative flex items-center space-x-4 px-4 py-3 rounded-2xl transition-all group ${
                      item.active
                        ? "text-primary-500"
                        : "text-secondary-500 hover:bg-secondary-50"
                    }`}
                  >
                    {/* Den mjuka rödaktiga bakgrunden för aktiv länk från bilden */}
                    {item.active && (
                      <div className="absolute inset-0 bg-linear-to-r from-primary-50/80 to-transparent rounded-2xl -z-10" />
                    )}

                    <div
                      className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors p-2 ${
                        item.active
                          ? "bg-primary-500 text-white shadow-lg shadow-primary-500/20"
                          : "bg-secondary-50 text-secondary-500 group-hover:bg-secondary-100"
                      }`}
                    >
                      <FontAwesomeIcon icon={item.icon} className="text-sm" />
                    </div>
                    <span className="font-bold text-sm">{item.name}</span>
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>
        <button className="flex items-center space-x-4 px-4 py-3 text-primary-500 hover:bg-primary-50 rounded-2xl w-full transition-all">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-500 text-white shadow-lg shadow-primary-500/20">
            <FontAwesomeIcon icon={faSignOutAlt} className="text-sm" />
          </div>
          <span className="font-bold text-sm">Log Out</span>
        </button>

        <DownloadApp></DownloadApp>
      </div>
    </aside>
  );
};

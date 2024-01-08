import { IconButton } from "@material-tailwind/react";
import Configurator from "widgets/layout/configurator";
import DashboardNavbar from "widgets/layout/dashboard-navbar";
import Footer from "widgets/layout/footer";
import Sidenav from "widgets/layout/sidenav";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        <Configurator />
        <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
        ></IconButton>

        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  );
}

import {
  AccountBalanceOutlined,
  MailLockRounded,
  MapRounded,
  PaymentSharp,
  SmsRounded,
  Task,
} from "@mui/icons-material";
import { Icon, List, ListItemIcon } from "@mui/material";
import { IconLayoutList } from "@tabler/icons-react";
import { IconReceipt } from "@tabler/icons-react";
import { IconUsersGroup } from "@tabler/icons-react";
import {
  IconLayoutDashboard,
  IconUsers,
  IconPackages,
  IconPackageImport,
  IconClipboardData,
  IconClipboardList,
  IconAugmentedReality,
  IconListDetails,
} from "@tabler/icons-react";

import { uniq, uniqueId } from "lodash";
import { title } from "process";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Home",
  },

  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/",
  },

  {
    navlabel: true,
    subheader: "Recruitments",
  },

  {
    id: uniqueId(),
    title: "Recruitment",
    icon: IconReceipt,
    href: "/recruitment",
  },

  {
    navlabal: true,
    subheader: "Roles",
  },

  {
    id: uniqueId(),
    title: "Role",
    icon: IconUsers,
    href: "/role",
  },

  {
    navlabal: true,
    subheader: "Users",
  },

  {
    id: uniqueId(),
    title: "User",
    icon: IconUsers,
    href: "/users",
  },

  {
    id: uniqueId(),
    title: "User Details",
    icon: IconListDetails,
    href: "/users/usersDetails",
  },

  {
    navlabal: true,
    subheader: "Tasks",
  },

  {
    id: uniqueId(),
    title: "Tasks",
    icon: IconLayoutList,
    href: "/task",
  },

  {
    navlabel: true,
    subheader: "Orders",
  },
  {
    id: uniqueId(),
    title: "Orders",
    icon: IconClipboardData,
    href: "/orders",
  },
  {
    id: uniqueId(),
    title: "Order Details",
    icon: IconClipboardList,
    href: "/orders/orderDetails",
  },
  {
    id: uniqueId(),
    title: "Order By Website",
    icon: IconClipboardList,
    href: "/orders/orderByWebsite",
  },

  {
    navlabel: true,
    subheader: "Products",
  },

  {
    id: uniqueId(),
    title: "Product Details",
    icon: IconPackages,
    href: "/products/productDetails",
  },
  {
    id: uniqueId(),
    title: "Add New Product",
    icon: IconPackageImport,
    href: "/products/addNewProduct",
  },

  {
    id: uniqueId(),
    title: "Product Category",
    icon: IconAugmentedReality,
    href: "/products/productCategory",
  },
  {
    id: uniqueId(),
    title: "Product Variant",
    icon: IconPackageImport,
    href: "/products/productVariants",
  },
  {
    navlabel: true,
    subheader: "Salesman",
  },
  {
    id: uniqueId(),
    title: "Sales Manager",
    icon: IconUsers,
    href: "/salesmen/salesManager",
  },
  {
    id: uniqueId(),
    title: "Salesman",
    icon: IconUsers,
    href: "/salesmen",
  },
  {
    navlabel: true,
    subheader: "Area",
  },
  {
    id: uniqueId(),
    title: "Country",
    icon: IconPackageImport,
    href: "/country",
  },
  {
    id: uniqueId(),
    title: "State",
    icon: IconPackageImport,
    href: "/state",
  },
  {
    id: uniqueId(),
    title: "City",
    icon: IconPackageImport,
    href: "/city",
  },

  {
    id: uniqueId(),
    title: "Area",
    icon: IconPackageImport,
    href: "/area",
  },

  {
    navlabel: true,
    subheader: "Account",
  },

  {
    id: uniqueId(),
    title: "Sales Return/Cr. Note",
    icon: AccountBalanceOutlined,
    href: "/accountant",
  },

  {
    navlabel: true,
    subheader: "Setting",
  },
  {
    id: uniqueId(),
    title: "Mail Setting",
    icon: MailLockRounded,
    href: "/mailSetting",
  },
  {
    id: uniqueId(),
    title: "Email Templete",
    icon: MailLockRounded,
    href: "/mailSetting/mailTemplete",
  },
  {
    id: uniqueId(),
    title: "Sms Configuration",
    icon: SmsRounded,
    href: "/smsConfiguration",
  },
  {
    id: uniqueId(),
    title: "Sms Templete",
    icon: SmsRounded,
    href: "/smsConfiguration/smsTemplete",
  },
  {
    id: uniqueId(),
    title: "Google Map Tracking",
    icon: MapRounded,
    href: "/googleMap",
  },
  // {
  //   id: uniqueId(),
  //   title: "Payment Gateway",
  //   icon: PaymentSharp,
  //   href: "/paymentGateway",
  // },
  {
    navlabel: true,
    subheader: "Audit Trail Logs",
  },
  {
    id: uniqueId(),
    title: "User Logs",
    icon: IconUsersGroup,
    href: "/userLogs",
  },
  {
    id: uniqueId(),
    title: "Permission Logs",
    icon: IconUsersGroup,
    href: "/permissionLogs",
  },
];

export default Menuitems;

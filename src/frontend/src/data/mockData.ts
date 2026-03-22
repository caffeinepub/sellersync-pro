export type PlatformStatus = "connected" | "error" | "pending" | "disconnected";

export interface Platform {
  id: string;
  name: string;
  logo: string;
  color: string;
  status: PlatformStatus;
  revenue: number;
  orders: number;
  growth: number;
  lastSync: string;
  region: string;
  pendingActions: number;
}

export interface Order {
  id: string;
  customer: string;
  platform: string;
  status:
    | "fulfilled"
    | "shipped"
    | "processing"
    | "pending"
    | "cancelled"
    | "returned";
  total: number;
  date: string;
  items: number;
  category: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  stock: number;
  threshold: number;
  price: number;
  category: string;
  platforms: string[];
  lastMovement: { date: string; qty: number; direction: "in" | "out" };
}

export interface Permission {
  id: string;
  label: string;
  description: string;
  granted: boolean;
  risk: "low" | "medium" | "high";
}

export interface AIAction {
  id: string;
  label: string;
  description: string;
  permissionRequired: string;
  platform?: string;
  execute: () => string;
}

export const platforms: Platform[] = [
  {
    id: "amazon",
    name: "Amazon",
    logo: "A",
    color: "#FF9900",
    status: "connected",
    revenue: 182450,
    orders: 1243,
    growth: 18.2,
    lastSync: "2 min ago",
    region: "Global",
    pendingActions: 3,
  },
  {
    id: "flipkart",
    name: "Flipkart",
    logo: "F",
    color: "#2874F0",
    status: "connected",
    revenue: 96300,
    orders: 874,
    growth: 12.5,
    lastSync: "5 min ago",
    region: "India",
    pendingActions: 1,
  },
  {
    id: "meesho",
    name: "Meesho",
    logo: "M",
    color: "#F43397",
    status: "connected",
    revenue: 43200,
    orders: 562,
    growth: 31.4,
    lastSync: "8 min ago",
    region: "India",
    pendingActions: 5,
  },
  {
    id: "alibaba",
    name: "Alibaba",
    logo: "Ali",
    color: "#FF6A00",
    status: "pending",
    revenue: 0,
    orders: 0,
    growth: 0,
    lastSync: "Not synced",
    region: "China/Global",
    pendingActions: 0,
  },
  {
    id: "indiamart",
    name: "IndiaMart",
    logo: "IM",
    color: "#00A651",
    status: "error",
    revenue: 12800,
    orders: 89,
    growth: -4.1,
    lastSync: "2 hrs ago",
    region: "India",
    pendingActions: 2,
  },
];

export const orders: Order[] = [
  {
    id: "#AM-8821",
    customer: "Riya Sharma",
    platform: "Amazon",
    status: "fulfilled",
    total: 4299,
    date: "22 Mar 2026",
    items: 2,
    category: "Electronics",
  },
  {
    id: "#FK-3341",
    customer: "Arjun Mehta",
    platform: "Flipkart",
    status: "shipped",
    total: 1799,
    date: "22 Mar 2026",
    items: 1,
    category: "Clothing",
  },
  {
    id: "#ME-1120",
    customer: "Priya Nair",
    platform: "Meesho",
    status: "processing",
    total: 599,
    date: "21 Mar 2026",
    items: 3,
    category: "Home Decor",
  },
  {
    id: "#AM-8819",
    customer: "Vikram Das",
    platform: "Amazon",
    status: "returned",
    total: 8999,
    date: "21 Mar 2026",
    items: 1,
    category: "Electronics",
  },
  {
    id: "#FK-3339",
    customer: "Sneha Pillai",
    platform: "Flipkart",
    status: "fulfilled",
    total: 2499,
    date: "20 Mar 2026",
    items: 2,
    category: "Beauty",
  },
  {
    id: "#IM-0091",
    customer: "Rajesh Kumar",
    platform: "IndiaMart",
    status: "pending",
    total: 15600,
    date: "20 Mar 2026",
    items: 10,
    category: "Industrial",
  },
  {
    id: "#ME-1118",
    customer: "Deepa Verma",
    platform: "Meesho",
    status: "shipped",
    total: 449,
    date: "19 Mar 2026",
    items: 2,
    category: "Clothing",
  },
  {
    id: "#AM-8810",
    customer: "Amit Patel",
    platform: "Amazon",
    status: "fulfilled",
    total: 3199,
    date: "19 Mar 2026",
    items: 1,
    category: "Electronics",
  },
  {
    id: "#FK-3330",
    customer: "Kavya Reddy",
    platform: "Flipkart",
    status: "cancelled",
    total: 1099,
    date: "18 Mar 2026",
    items: 1,
    category: "Books",
  },
  {
    id: "#IM-0088",
    customer: "Suresh Joshi",
    platform: "IndiaMart",
    status: "processing",
    total: 22000,
    date: "18 Mar 2026",
    items: 20,
    category: "Industrial",
  },
  {
    id: "#ME-1112",
    customer: "Ananya Singh",
    platform: "Meesho",
    status: "fulfilled",
    total: 749,
    date: "17 Mar 2026",
    items: 3,
    category: "Home Decor",
  },
  {
    id: "#AM-8800",
    customer: "Nikhil Gupta",
    platform: "Amazon",
    status: "shipped",
    total: 5499,
    date: "17 Mar 2026",
    items: 1,
    category: "Electronics",
  },
];

export const inventory: InventoryItem[] = [
  {
    id: "SKU-001",
    name: "Wireless Earbuds Pro",
    sku: "WEP-001",
    stock: 8,
    threshold: 15,
    price: 3499,
    category: "Electronics",
    platforms: ["Amazon", "Flipkart"],
    lastMovement: { date: "22 Mar", qty: -12, direction: "out" },
  },
  {
    id: "SKU-002",
    name: "Cotton Kurta Set",
    sku: "CKS-002",
    stock: 142,
    threshold: 30,
    price: 899,
    category: "Clothing",
    platforms: ["Flipkart", "Meesho"],
    lastMovement: { date: "22 Mar", qty: 200, direction: "in" },
  },
  {
    id: "SKU-003",
    name: "Steel Water Bottle",
    sku: "SWB-003",
    stock: 4,
    threshold: 20,
    price: 549,
    category: "Home",
    platforms: ["Amazon", "Meesho", "Flipkart"],
    lastMovement: { date: "21 Mar", qty: -8, direction: "out" },
  },
  {
    id: "SKU-004",
    name: "Laptop Stand Adjustable",
    sku: "LSA-004",
    stock: 67,
    threshold: 10,
    price: 1299,
    category: "Electronics",
    platforms: ["Amazon"],
    lastMovement: { date: "21 Mar", qty: 50, direction: "in" },
  },
  {
    id: "SKU-005",
    name: "Organic Face Serum",
    sku: "OFS-005",
    stock: 3,
    threshold: 25,
    price: 799,
    category: "Beauty",
    platforms: ["Flipkart", "Meesho"],
    lastMovement: { date: "20 Mar", qty: -17, direction: "out" },
  },
  {
    id: "SKU-006",
    name: "Industrial Bolt Set 500pc",
    sku: "IBS-006",
    stock: 220,
    threshold: 50,
    price: 2400,
    category: "Industrial",
    platforms: ["IndiaMart"],
    lastMovement: { date: "20 Mar", qty: 500, direction: "in" },
  },
  {
    id: "SKU-007",
    name: "Scented Candle Pack",
    sku: "SCP-007",
    stock: 5,
    threshold: 20,
    price: 349,
    category: "Home Decor",
    platforms: ["Meesho", "Amazon"],
    lastMovement: { date: "19 Mar", qty: -15, direction: "out" },
  },
  {
    id: "SKU-008",
    name: "USB-C Hub 7-in-1",
    sku: "UCH-008",
    stock: 38,
    threshold: 15,
    price: 2199,
    category: "Electronics",
    platforms: ["Amazon", "Flipkart"],
    lastMovement: { date: "19 Mar", qty: 40, direction: "in" },
  },
];

export const permissions: Permission[] = [
  {
    id: "reorder",
    label: "Auto Reorder",
    description: "AI can place reorder requests to suppliers",
    granted: false,
    risk: "medium",
  },
  {
    id: "pricing",
    label: "Price Adjustment",
    description: "AI can adjust product prices on platforms",
    granted: false,
    risk: "high",
  },
  {
    id: "listings",
    label: "Manage Listings",
    description: "AI can create and update product listings",
    granted: true,
    risk: "medium",
  },
  {
    id: "returns",
    label: "Process Returns",
    description: "AI can approve or reject return requests",
    granted: true,
    risk: "low",
  },
  {
    id: "promotions",
    label: "Run Promotions",
    description: "AI can activate discount campaigns",
    granted: false,
    risk: "medium",
  },
  {
    id: "reports",
    label: "Generate Reports",
    description: "AI can create and export analytics reports",
    granted: true,
    risk: "low",
  },
  {
    id: "sync",
    label: "Platform Sync",
    description: "AI can sync data across all platforms",
    granted: true,
    risk: "low",
  },
];

export const analyticsData = [
  { date: "Mar 1", amazon: 5200, flipkart: 3100, meesho: 1200, indiamart: 800 },
  { date: "Mar 5", amazon: 6800, flipkart: 3600, meesho: 1800, indiamart: 600 },
  { date: "Mar 8", amazon: 5900, flipkart: 4200, meesho: 2100, indiamart: 900 },
  {
    date: "Mar 12",
    amazon: 7400,
    flipkart: 3900,
    meesho: 1600,
    indiamart: 1200,
  },
  {
    date: "Mar 15",
    amazon: 8100,
    flipkart: 4800,
    meesho: 2400,
    indiamart: 700,
  },
  {
    date: "Mar 18",
    amazon: 7200,
    flipkart: 4100,
    meesho: 3100,
    indiamart: 1100,
  },
  {
    date: "Mar 22",
    amazon: 9300,
    flipkart: 5200,
    meesho: 3600,
    indiamart: 1400,
  },
];

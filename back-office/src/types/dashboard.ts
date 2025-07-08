export interface Marker {
    latLng: [number, number];
    name: string;
    style: {
        fill: string;
        borderWidth: number;
        borderColor: string;
        stroke?: string;
        strokeOpacity?: number;
    };
}

export interface DashboardData {
    totalUsers: number;
    totalTransactions: number;
    totalMined: string | number;
    totalItemsPurchased: number;
    topUsers: {
        user_id: number;
        username: string;
        amount: string | number;
    }[];
}

export interface DashboardState {
    data: DashboardData | null;
    loading: boolean;
    error: string | null;
    fetchDashboard: () => Promise<void>;
}

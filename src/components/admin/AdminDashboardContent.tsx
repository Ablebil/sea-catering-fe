import { useState, useEffect } from "react";
import { adminService } from "../../api/services/adminService";
import DateRangeSelector from "./DateRangeSelector";
import StatsCard from "./StatsCard";
import {
  UserPlusIcon,
  CurrencyDollarIcon,
  ArrowPathIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

const AdminDashboardContent = () => {
  const [stats, setStats] = useState({
    newSubscriptions: 0,
    mrr: 0,
    reactivations: 0,
    totalActive: 0,
  });
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState(() => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 30);

    return {
      startDate: startDate.toISOString().split("T")[0],
      endDate: endDate.toISOString().split("T")[0],
    };
  });

  const fetchStats = async (startDate: string, endDate: string) => {
    setLoading(true);
    try {
      const [newSubs, mrr, reactivations, totalActive] = await Promise.all([
        adminService.getNewSubscriptionsStats({
          start_date: startDate,
          end_date: endDate,
        }),
        adminService.getMRRStats({ start_date: startDate, end_date: endDate }),
        adminService.getReactivationStats({
          start_date: startDate,
          end_date: endDate,
        }),
        adminService.getTotalActiveSubscriptions(),
      ]);

      setStats({
        newSubscriptions: newSubs,
        mrr: mrr,
        reactivations: reactivations,
        totalActive: totalActive,
      });
    } catch (error) {
      console.error("Failed to fetch admin stats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats(dateRange.startDate, dateRange.endDate);
  }, []);

  const handleDateChange = (startDate: string, endDate: string) => {
    setDateRange({ startDate, endDate });
    fetchStats(startDate, endDate);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-8">
      <DateRangeSelector
        startDate={dateRange.startDate}
        endDate={dateRange.endDate}
        onDateChange={handleDateChange}
        loading={loading}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="New Subscriptions"
          value={stats.newSubscriptions}
          loading={loading}
          icon={<UserPlusIcon className="w-6 h-6" />}
          color="green"
        />
        <StatsCard
          title="Monthly Recurring Revenue"
          value={formatCurrency(stats.mrr)}
          loading={loading}
          icon={<CurrencyDollarIcon className="w-6 h-6" />}
          color="blue"
        />
        <StatsCard
          title="Reactivations"
          value={stats.reactivations}
          loading={loading}
          icon={<ArrowPathIcon className="w-6 h-6" />}
          color="yellow"
        />
        <StatsCard
          title="Total Active Subscriptions"
          value={stats.totalActive}
          loading={loading}
          icon={<UserGroupIcon className="w-6 h-6" />}
          color="purple"
        />
      </div>
    </div>
  );
};

export default AdminDashboardContent;

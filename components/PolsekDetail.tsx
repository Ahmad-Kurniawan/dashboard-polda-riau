"use client";

import { useState } from "react";
import {
  Building2,
  Home,
  Phone,
  MapPin,
  User,
  Target,
  Map,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Label,
  Tooltip,
  Cell,
} from "recharts";
import { Polsek, Village } from "@/types"; // Import the interface

interface PolsekDetailProps {
  polsek: Polsek | null;
  isOpen: boolean;
  onClose: () => void;
}

const PolsekDetail: React.FC<PolsekDetailProps> = ({
  polsek,
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState("overview");

  if (!polsek) return null;

  // Calculate total target and achievements from all villages
  const totalTarget =
    polsek.villages?.reduce(
      (total, village) => total + (village.target || 0),
      0
    ) || 0;

  const totalAchievement =
    polsek.villages?.reduce(
      (total, village) => total + (village.achievement || 0),
      0
    ) || 0;

  // Prepare data for pie chart - now showing target vs achievement
  const pieChartData = [
    { name: "Total Capaian", value: totalAchievement },
    {
      name: "Target Belum Tercapai",
      value: Math.max(0, totalTarget - totalAchievement),
    },
  ];

  // Colors for the pie chart
  const COLORS = ["#4caf50", "#f5f5f5"];

  // Calculate achievement percentage
  const achievementPercentage =
    totalTarget > 0 ? Math.round((totalAchievement / totalTarget) * 100) : 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="md:max-w-5xl max-h-[95%] w-[95%] overflow-y-auto p-0 rounded-lg border-0 shadow-lg">
        <DialogHeader className="bg-white border-b px-6 py-4">
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl font-medium flex items-center gap-2">
              <Building2 className="h-5 w-5 text-blue-500" />
              {polsek.name}
            </DialogTitle>
            <button
              onClick={onClose}
              className="rounded-full p-1.5 hover:bg-gray-100 transition-colors"
            ></button>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="villages">Daftar Desa</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="p-6">
            <div className="grid grid-cols-1 gap-6">
              {/* Total Target and Achievement Pie Chart Card */}
              <Card>
                <CardHeader className="items-center">
                  <CardTitle className="text-sm font-medium">
                    Capaian Polsek
                  </CardTitle>
                  <CardDescription>Target dan Capaian Total</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Tooltip
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="rounded-lg border bg-background p-2 shadow-sm">
                                  <div className="flex flex-col">
                                    <span className="text-[0.70rem] uppercase text-muted-foreground">
                                      {payload[0].name}
                                    </span>
                                    <span className="font-bold text-muted-foreground">
                                      {(
                                        Number(payload[0]?.value) ?? 0
                                      ).toLocaleString("id-ID", {
                                        maximumFractionDigits: 2,
                                      })}{" "}
                                      Ha
                                    </span>
                                  </div>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Pie
                          data={pieChartData}
                          dataKey="value"
                          nameKey="name"
                          innerRadius={75}
                          outerRadius={100}
                          strokeWidth={5}
                        >
                          {pieChartData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                          <Label
                            content={({ viewBox }) => {
                              if (
                                viewBox &&
                                "cx" in viewBox &&
                                "cy" in viewBox
                              ) {
                                return (
                                  <text
                                    x={viewBox.cx}
                                    y={viewBox.cy}
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                  >
                                    <tspan
                                      x={viewBox.cx}
                                      y={viewBox.cy}
                                      className="fill-foreground text-3xl font-bold"
                                    >
                                      {achievementPercentage}%
                                    </tspan>
                                    <tspan
                                      x={viewBox.cx}
                                      y={(viewBox.cy || 0) + 24}
                                      className="fill-muted-foreground text-sm"
                                    >
                                      Capaian
                                    </tspan>
                                  </text>
                                );
                              }
                            }}
                          />
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
                <CardFooter className="flex-col gap-3">
                  {/* Legend Section */}
                  <div className="w-full grid grid-cols-1 gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: COLORS[0] }}
                        ></div>
                        <span className="text-sm text-muted-foreground">
                          Total Capaian
                        </span>
                      </div>
                      <span className="text-sm font-medium">
                        {totalAchievement.toLocaleString("id-ID", {
                          maximumFractionDigits: 2,
                        })}{" "}
                        Ha
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: COLORS[1] }}
                        ></div>
                        <span className="text-sm text-muted-foreground">
                          Target Belum Tercapai
                        </span>
                      </div>
                      <span className="text-sm font-medium">
                        {Math.max(
                          0,
                          totalTarget - totalAchievement
                        ).toLocaleString("id-ID", {
                          maximumFractionDigits: 2,
                        })}{" "}
                        Ha
                      </span>
                    </div>
                  </div>
                  {/* Summary Section */}
                  <div className="w-full grid grid-cols-1 gap-2 pt-2 border-t">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4" />
                        <span className="text-sm text-muted-foreground">
                          Total
                        </span>
                      </div>
                      <span className="text-sm font-medium">
                        {totalAchievement.toLocaleString("id-ID", {
                          maximumFractionDigits: 2,
                        })}{" "}
                        dari{" "}
                        {totalTarget.toLocaleString("id-ID", {
                          maximumFractionDigits: 2,
                        })}{" "}
                        Ha
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Map className="h-4 w-4" />
                        <span className="text-sm text-muted-foreground">
                          Persentase Capaian
                        </span>
                      </div>
                      <span className="text-sm font-medium">
                        {achievementPercentage}%
                      </span>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          {/* Villages Tab */}
          <TabsContent value="villages" className="p-6">
            <div className="bg-white rounded-lg border overflow-hidden">
              <div className="p-4 border-b bg-blue-50 flex justify-between items-center">
                <h3 className="text-blue-700 font-medium">
                  Daftar Desa di Wilayah {polsek.name}
                </h3>
                <span className="text-sm text-gray-500">
                  Total: {polsek.villages?.length || 0} Desa
                </span>
              </div>

              {polsek.villages && polsek.villages.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="font-medium text-">
                          Nama Desa
                        </TableHead>
                        <TableHead className="font-medium text-center">
                          Waktu Tanam
                        </TableHead>
                        <TableHead className="font-medium text-center">
                          Waktu Panen
                        </TableHead>
                        <TableHead className="font-medium text-center">
                          Target (Ha)
                        </TableHead>
                        <TableHead className="font-medium text-center">
                          Capaian (Ha)
                        </TableHead>
                        <TableHead className="font-medium text-center">
                          Persentase
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {polsek.villages.map((village, index) => {
                        // Calculate percentage of achievement vs target
                        const achievementPercentage =
                          village.target && village.achievement
                            ? Math.round(
                                (village.achievement / village.target) * 100
                              )
                            : 0;

                        // Calculate harvest time (waktu panen) by adding 4 months to planting time
                        const convertIndonesianMonthToNumber = (monthName: string): number => {
                          const months: { [key: string]: number } = {
                            'januari': 0,
                            'februari': 1,
                            'maret': 2,
                            'april': 3,
                            'mei': 4,
                            'juni': 5,
                            'juli': 6,
                            'agustus': 7,
                            'september': 8,
                            'oktober': 9,
                            'november': 10,
                            'desember': 11
                          };
                          
                          // Ubah ke lowercase untuk mencocokkan dengan kamus
                          const lowerCaseMonth = monthName.toLowerCase();
                          return months[lowerCaseMonth] ?? -1; // Mengembalikan -1 jika bulan tidak ditemukan
                        };
                        
                        // Fungsi untuk mengonversi format tanggal '01-Januari-2025' ke objek Date
                        const parseIndonesianDate = (dateStr: string): Date | null => {
                          if (!dateStr) return null;
                          
                          try {
                            // Memisahkan tanggal, bulan, dan tahun
                            const parts = dateStr.split('-');
                            if (parts.length !== 3) return null;
                            
                            const day = parseInt(parts[0], 10);
                            const monthName = parts[1];
                            const year = parseInt(parts[2], 10);
                            
                            // Mendapatkan nomor bulan dari nama bulan
                            const monthIndex = convertIndonesianMonthToNumber(monthName);
                            if (monthIndex === -1) return null;
                            
                            // Membuat objek Date
                            return new Date(year, monthIndex, day);
                          } catch (error) {
                            return null;
                          }
                        };
                        
                        // Fungsi untuk memformat Date ke format Indonesia '01-Januari-2025'
                        const formatToIndonesianDate = (date: Date): string => {
                          if (!date) return "-";
                          
                          const day = date.getDate().toString().padStart(2, '0');
                          
                          const monthNames = [
                            'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
                            'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
                          ];
                          const month = monthNames[date.getMonth()];
                          const year = date.getFullYear();
                          
                          return `${day}-${month}-${year}`;
                        };
                        
                        // Fungsi yang diperbarui untuk menghitung waktu panen
                        const calculateHarvestTime = (waktuTanam: string): string => {
                          if (!waktuTanam) return "-";
                          
                          try {
                            // Parsing tanggal dengan format Indonesia
                            const plantDate = parseIndonesianDate(waktuTanam);
                            
                            // Jika tanggal tidak dapat di-parse, coba cara lain
                            if (!plantDate) {
                              // Coba parse sebagai tanggal standar jika format berbeda
                              const stdDate = new Date(waktuTanam);
                              if (!isNaN(stdDate.getTime())) {
                                const harvestDate = new Date(stdDate);
                                harvestDate.setMonth(harvestDate.getMonth() + 4);
                                return formatToIndonesianDate(harvestDate);
                              }
                              return waktuTanam + " + 4 bulan";
                            }
                            
                            // Menambahkan 4 bulan ke tanggal tanam
                            const harvestDate = new Date(plantDate);
                            harvestDate.setMonth(harvestDate.getMonth() + 4);
                            
                            // Memformat tanggal panen ke format Indonesia
                            return formatToIndonesianDate(harvestDate);
                          } catch (error) {
                            return waktuTanam + " + 4 bulan";
                          }
                        };

                        return (
                          <TableRow key={village.id || index}>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Home className="h-3.5 w-3.5 text-gray-400" />
                                {village.name}
                              </div>
                            </TableCell>
                            <TableCell className="text-sm text-center">
                              {village.waktuTanam || "-"}
                            </TableCell>
                            <TableCell className="text-sm text-center">
                            {calculateHarvestTime(village.waktuTanam ?? "") || "-"}
                            </TableCell>
                            <TableCell className="text-sm text-center">
                              {village.target
                                ? village.target.toLocaleString("id-ID")
                                : "-"}
                            </TableCell>
                            <TableCell className="text-sm text-center">
                              {village.achievement
                                ? village.achievement.toLocaleString("id-ID")
                                : "-"}
                            </TableCell>
                            <TableCell className="text-sm text-center">
                              {village.target && village.achievement ? (
                                <div className="flex items-center justify-center gap-1">
                                  <span
                                    className={`
                ${
                  achievementPercentage >= 80
                    ? "text-green-600"
                    : achievementPercentage >= 50
                    ? "text-amber-600"
                    : "text-red-600"
                }
                font-medium
              `}
                                  >
                                    {achievementPercentage}%
                                  </span>
                                </div>
                              ) : (
                                "-"
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="py-12 text-center text-gray-400">
                  <Home className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                  <p>Belum ada data desa yang tersedia</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default PolsekDetail;

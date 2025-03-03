"use client";

import { useState } from "react";
import {
  Building2,
  Home,
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

  const pieChartData = 
    totalAchievement <= totalTarget 
      ? [
          { name: "Total Capaian", value: totalAchievement },
          {
            name: "Target Belum Tercapai",
            value: Math.max(0, totalTarget - totalAchievement),
          },
        ]
      : [
          { name: "Total Capaian (Sesuai Target)", value: totalTarget },
          { name: "Kelebihan Capaian", value: totalAchievement - totalTarget },
        ];

  // Colors for the pie chart - green for achievement, gray for unfulfilled, blue for excess
  const COLORS = totalAchievement <= totalTarget 
    ? ["#4caf50", "#f5f5f5"] 
    : ["#4caf50", "#2196f3"];

  // Calculate achievement percentage, capped at 100% for display purposes
  const displayAchievementPercentage =
    totalTarget > 0 
      ? Math.min(100, Math.round((totalAchievement / totalTarget) * 100)) 
      : 0;
      
  // Actual achievement percentage (can be over 100%)
  const actualAchievementPercentage =
    totalTarget > 0 
      ? Math.round((totalAchievement / totalTarget) * 100) 
      : 0;

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
                                      {displayAchievementPercentage}%
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
                    {totalAchievement <= totalTarget ? (
                      // Standard legend when achievement is less than or equal to target
                      <>
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
                      </>
                    ) : (
                      // Alternative legend when achievement exceeds target
                      <>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div
                              className="h-3 w-3 rounded-full"
                              style={{ backgroundColor: COLORS[0] }}
                            ></div>
                            <span className="text-sm text-muted-foreground">
                              Target Tercapai
                            </span>
                          </div>
                          <span className="text-sm font-medium">
                            {totalTarget.toLocaleString("id-ID", {
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
                              Kelebihan Capaian
                            </span>
                          </div>
                          <span className="text-sm font-medium">
                            {(totalAchievement - totalTarget).toLocaleString("id-ID", {
                              maximumFractionDigits: 2,
                            })}{" "}
                            Ha
                          </span>
                        </div>
                      </>
                    )}
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
                        {displayAchievementPercentage}%
                        {actualAchievementPercentage > 100 && 
                          <span className="text-xs text-green-600 ml-1">
                            (Melebihi target {actualAchievementPercentage}%)
                          </span>
                        }
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
                        const rawAchievementPercentage =
                          village.target && village.achievement
                            ? Math.round(
                                (village.achievement / village.target) * 100
                              )
                            : 0;
                        
                        // Display percentage - capped at 100% for visual consistency
                        const displayPercentage = Math.min(100, rawAchievementPercentage);
                        
                        // Is this an overachievement?
                        const isOverachievement = rawAchievementPercentage > 100;

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
                            const parts = dateStr.split(' ');
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
                          if (!date) return " ";
                          
                          const day = date.getDate().toString().padStart(2, '0');
                          
                          const monthNames = [
                            'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
                            'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
                          ];
                          const month = monthNames[date.getMonth()];
                          const year = date.getFullYear();
                          
                          return ` ${month} ${year}`;
                        };
                        
                        // Fungsi yang diperbarui untuk menghitung waktu panen
                        const calculateHarvestTime = (waktuTanam: string): string => {
                          if (!waktuTanam || waktuTanam.trim() === '') return " ";
                          
                          try {
                            // Khusus untuk format sederhana "bulan tahun"
                            const parts = waktuTanam.trim().split(/\s+/); // Split by one or more whitespaces
                            
                            if (parts.length === 2) {
                              // Format: "bulan tahun" (misalnya "mei 2023")
                              let monthStr = parts[0].toLowerCase().trim();
                              const year = parseInt(parts[1], 10);
                              
                              if (!isNaN(year)) {
                                // Map bulan ke indeks (0-11)
                                const monthMap: { [key: string]: number } = {
                                  'januari': 0, 'jan': 0, 'JANUARI': 0,
                                  'februari': 1, 'feb': 1, 'FEBRUARI': 1,
                                  'maret': 2, 'mar': 2, 'MARET': 2,
                                  'april': 3, 'apr': 3, 'APRIL': 3,
                                  'mei': 4, 'may': 4, 'MEI': 4,
                                  'juni': 5, 'jun': 5, 'JUNI': 5,
                                  'juli': 6, 'jul': 6, 'JULI': 6,
                                  'agustus': 7, 'agu': 7, 'aug': 7, 'AGUSTUS': 7,
                                  'september': 8, 'sep': 8, 'SEPTEMBER': 8,
                                  'oktober': 9, 'okt': 9, 'oct': 9, 'OKTOBER': 9,
                                  'november': 10, 'nov': 10, 'NOVEMBER': 10,
                                  'desember': 11, 'des': 11, 'dec': 11, 'DESEMBER': 11
                                };
                                
                                // Cek jika nama bulan dikenali
                                if (monthMap[monthStr] !== undefined) {
                                  // Buat tanggal awal bulan
                                  const plantDate = new Date(year, monthMap[monthStr], 1);
                                  
                                  // Tambah 4 bulan untuk waktu panen
                                  const harvestDate = new Date(plantDate);
                                  harvestDate.setMonth(harvestDate.getMonth() + 4);
                                  
                                  // Format nama bulan dengan huruf kapital di awal
                                  const monthNames = [
                                    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
                                    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
                                  ];
                                  
                                  // Return format bulan dan tahun (contoh: "September 2023")
                                  return `${monthNames[harvestDate.getMonth()]} ${harvestDate.getFullYear()}`;
                                }
                              }
                            }
                            
                            // Jika format tidak cocok dengan "bulan tahun", coba metode parsing lain
                            // (gunakan kode parsing yang sudah ada)
                            const plantDate = parseIndonesianDate(waktuTanam);
                            
                            if (!plantDate) {
                              // Fallback: tambahkan "+ 4 bulan" jika parsing gagal
                              return `${waktuTanam} + 4 bulan`;
                            }
                            
                            // Tambah 4 bulan
                            const harvestDate = new Date(plantDate);
                            harvestDate.setMonth(harvestDate.getMonth() + 4);
                            
                            // Format hasil
                            return formatToIndonesianDate(harvestDate);
                          } catch (error) {
                            console.log(`Error menghitung waktu panen untuk: ${waktuTanam}`, error);
                            return `${waktuTanam} + 4 bulan`;
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
                              {village.waktuTanam || " "}
                            </TableCell>
                            <TableCell className="text-sm text-center">
                            {calculateHarvestTime(village.waktuTanam ?? "") || " "}
                            </TableCell>
                            <TableCell className="text-sm text-center">
                              {village.target
                                ? village.target.toLocaleString("id-ID")
                                : " "}
                            </TableCell>
                            <TableCell className="text-sm text-center">
                              {village.achievement
                                ? village.achievement.toLocaleString("id-ID")
                                : " "}
                            </TableCell>
                            <TableCell className="text-sm text-center">
                              {village.target && village.achievement ? (
                                <div className="flex items-center justify-center gap-1">
                                  <span
                                    className={`
                ${
                  displayPercentage >= 80
                    ? "text-green-600"
                    : displayPercentage >= 50
                    ? "text-amber-600"
                    : "text-red-600"
                }
                font-medium
              `}
                                  >
                                    {displayPercentage}%
                                    {isOverachievement && (
                                      <span className="text-xs text-amber-600 ml-1">
                                        ({rawAchievementPercentage}%)
                                      </span>
                                    )}
                                  </span>
                                </div>
                              ) : (
                                " "
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
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Trophy,
  BarChart4,
  Table as TableIcon,
  ArrowUpDown,
  Info,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";

import { riauCity } from "../data/RiauCity";

import { City } from "../types";

const formatNumber = (num: number) => {
  return num.toFixed(2);
};

// Calculate total achievements for stage III (for ranking)
const getTotalAchievements = (city: City) => {
  // Calculate monokultur achievements
  const monokulturSum = city.otherCompanies
    ? city.otherCompanies.reduce((sum, company) => {
        return sum + (company.monokulturAchievements?.III || 0);
      }, 0)
    : 0;

  // Calculate tumpangsari achievements
  const tumpangSariSum = city.otherCompanies
    ? city.otherCompanies.reduce((sum, company) => {
        return sum + (company.tumpangSariAchievements?.III || 0);
      }, 0)
    : 0;

  // Calculate CSR achievements
  const csrSum = city.otherCompanies
    ? city.otherCompanies.reduce((sum, company) => {
        return sum + (company.csrAchievements?.III || 0);
      }, 0)
    : 0;

  return monokulturSum + tumpangSariSum + csrSum;
};

// Prepare the data for display in the table
const prepareTableData = () => {
  return riauCity.map((city) => {
    // Calculate achievements for each type and stage
    const monokulturAchievements = {
      i: city.otherCompanies
        ? city.otherCompanies.reduce(
            (sum, company) => sum + (company.monokulturAchievements?.I || 0),
            0
          )
        : 0,
      ii: city.otherCompanies
        ? city.otherCompanies.reduce(
            (sum, company) => sum + (company.monokulturAchievements?.II || 0),
            0
          )
        : 0,
      iii: city.otherCompanies
        ? city.otherCompanies.reduce(
            (sum, company) => sum + (company.monokulturAchievements?.III || 0),
            0
          )
        : 0,
      iv: city.otherCompanies
        ? city.otherCompanies.reduce(
            (sum, company) => sum + (company.monokulturAchievements?.IV || 0),
            0
          )
        : 0,
    };

    const tumpangSariAchievements = {
      i: city.otherCompanies
        ? city.otherCompanies.reduce(
            (sum, company) => sum + (company.tumpangSariAchievements?.I || 0),
            0
          )
        : 0,
      ii: city.otherCompanies
        ? city.otherCompanies.reduce(
            (sum, company) => sum + (company.tumpangSariAchievements?.II || 0),
            0
          )
        : 0,
      iii: city.otherCompanies
        ? city.otherCompanies.reduce(
            (sum, company) => sum + (company.tumpangSariAchievements?.III || 0),
            0
          )
        : 0,
      iv: city.otherCompanies
        ? city.otherCompanies.reduce(
            (sum, company) => sum + (company.tumpangSariAchievements?.IV || 0),
            0
          )
        : 0,
    };

    const csrAchievements = {
      i: city.otherCompanies
        ? city.otherCompanies.reduce(
            (sum, company) => sum + (company.csrAchievements?.I || 0),
            0
          )
        : 0,
      ii: city.otherCompanies
        ? city.otherCompanies.reduce(
            (sum, company) => sum + (company.csrAchievements?.II || 0),
            0
          )
        : 0,
      iii: city.otherCompanies
        ? city.otherCompanies.reduce(
            (sum, company) => sum + (company.csrAchievements?.III || 0),
            0
          )
        : 0,
      iv: city.otherCompanies
        ? city.otherCompanies.reduce(
            (sum, company) => sum + (company.csrAchievements?.IV || 0),
            0
          )
        : 0,
    };

    return {
      no: city.id,
      namaPerusahaan: city.nama,
      luasTotalLahan: city.otherTotalArea,
      capaianMonokultur: monokulturAchievements,
      capaianTumpangSari: tumpangSariAchievements,
      capaianCSR: csrAchievements,
    };
  });
};

// Sort data by total capaian for ranking view
const sortedData = () => {
  return [...riauCity]
    .sort((a, b) => getTotalAchievements(b) - getTotalAchievements(a))
    .map((city, index) => ({
      ...city,
      sortedIndex: index + 1,
    }));
};

// Prepare chart data
const prepareChartData = () => {
  return riauCity.map((city) => {
    const tahap1Total =
      city.otherCompanies?.reduce(
        (sum, company) =>
          sum +
          (company.monokulturAchievements?.I || 0) +
          (company.tumpangSariAchievements?.I || 0) +
          (company.csrAchievements?.I || 0),
        0
      ) || 0;

    const tahap2Total =
      city.otherCompanies?.reduce(
        (sum, company) =>
          sum +
          (company.monokulturAchievements?.II || 0) +
          (company.tumpangSariAchievements?.II || 0) +
          (company.csrAchievements?.II || 0),
        0
      ) || 0;

    const tahap3Total =
      city.otherCompanies?.reduce(
        (sum, company) =>
          sum +
          (company.monokulturAchievements?.III || 0) +
          (company.tumpangSariAchievements?.III || 0) +
          (company.csrAchievements?.III || 0),
        0
      ) || 0;

    const tahap4Total =
      city.otherCompanies?.reduce(
        (sum, company) =>
          sum +
          (company.monokulturAchievements?.IV || 0) +
          (company.tumpangSariAchievements?.IV || 0) +
          (company.csrAchievements?.IV || 0),
        0
      ) || 0;

    return {
      name: city.nama,
      TAHAP_I: tahap1Total,
      TAHAP_II: tahap2Total,
      TAHAP_III: tahap3Total,
      TAHAP_IV: tahap4Total,
    };
  });
};

const TabbedDataView: React.FC = () => {
  const tableData = prepareTableData();
  const chartData = prepareChartData();
  const [activeTab, setActiveTab] = useState("table");

  // Calculate phase totals and percentages for each city
  const calculateTotals = (data: any) => {
    return {
      phase1: {
        total:
          data.capaianMonokultur.i +
          data.capaianTumpangSari.i +
          data.capaianCSR.i,
        percentage: (
          ((data.capaianMonokultur.i +
            data.capaianTumpangSari.i +
            data.capaianCSR.i) /
            data.luasTotalLahan) *
          100
        ).toFixed(2),
      },
      phase2: {
        total:
          data.capaianMonokultur.ii +
          data.capaianTumpangSari.ii +
          data.capaianCSR.ii,
        percentage: (
          ((data.capaianMonokultur.ii +
            data.capaianTumpangSari.ii +
            data.capaianCSR.ii) /
            data.luasTotalLahan) *
          100
        ).toFixed(2),
      },
      phase3: {
        total:
          data.capaianMonokultur.iii +
          data.capaianTumpangSari.iii +
          data.capaianCSR.iii,
        percentage: (
          ((data.capaianMonokultur.iii +
            data.capaianTumpangSari.iii +
            data.capaianCSR.iii) /
            data.luasTotalLahan) *
          100
        ).toFixed(2),
      },
      phase4: {
        total:
          data.capaianMonokultur.iv +
          data.capaianTumpangSari.iv +
          data.capaianCSR.iv,
        percentage: (
          ((data.capaianMonokultur.iv +
            data.capaianTumpangSari.iv +
            data.capaianCSR.iv) /
            data.luasTotalLahan) *
          100
        ).toFixed(2),
      },
    };
  };

  return (
    <Card className="w-full shadow-lg border-blue-200">
      <CardHeader className="bg-blue-100 pb-2 border-b border-blue-200">
        <div className="flex items-center justify-center mb-2">
          <Trophy className="w-8 h-8 text-blue-600 mr-2" />
          <CardTitle className="text-center text-blue-600 text-2xl font-bold">
            Perankingan Dan Detail Kabupaten/Kota
          </CardTitle>
        </div>
        <CardDescription className="text-center text-gray-700">
          Analisis dan perbandingan capaian di seluruh kabupaten/kota
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <Tabs
          defaultValue="table"
          className="w-full"
          onValueChange={setActiveTab}
        >
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-4 bg-blue-100">
            <TabsTrigger value="table" className="flex items-center">
              <TableIcon className="h-4 w-4 mr-2" />
              Tabel Detail
            </TabsTrigger>
            <TabsTrigger value="chart" className="flex items-center">
              <BarChart4 className="h-4 w-4 mr-2" />
              Grafik
            </TabsTrigger>
          </TabsList>

          <TabsContent value="table" className="mt-0">
            <div className="rounded-md border border-gray-300 overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead
                        rowSpan={2}
                        className="text-center border border-gray-200 font-bold text-gray-800 bg-gray-300"
                      >
                        NO
                      </TableHead>
                      <TableHead
                        rowSpan={2}
                        className="text-center border border-gray-200 font-bold text-gray-800 bg-gray-300"
                      >
                        NAMA KABUPATEN/KOTA
                      </TableHead>
                      <TableHead
                        colSpan={6}
                        className="text-center border border-green-200 font-bold text-gray-800 bg-green-300"
                      >
                        <div className="flex justify-center items-center gap-2">
                          TAHAP I
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700 border-green-200"
                          >
                            25%
                          </Badge>
                        </div>
                      </TableHead>
                      <TableHead
                        colSpan={6}
                        className="text-center border border-blue-200 font-bold text-gray-800 bg-blue-300"
                      >
                        <div className="flex justify-center items-center gap-2">
                          TAHAP II
                          <Badge
                            variant="outline"
                            className="bg-blue-50 text-blue-700 border-blue-200"
                          >
                            25%
                          </Badge>
                        </div>
                      </TableHead>
                      <TableHead
                        colSpan={6}
                        className="text-center border border-purple-200 font-bold text-gray-800 bg-purple-300"
                      >
                        <div className="flex justify-center items-center gap-2">
                          TAHAP III
                          <Badge
                            variant="outline"
                            className="bg-purple-50 text-purple-700 border-purple-200"
                          >
                            25%
                          </Badge>
                        </div>
                      </TableHead>
                      <TableHead
                        colSpan={6}
                        className="text-center border border-red-200 font-bold text-gray-800 bg-red-300"
                      >
                        <div className="flex justify-center items-center gap-2">
                          TAHAP IV
                          <Badge
                            variant="outline"
                            className="bg-red-50 text-red-700 border-red-200"
                          >
                            25%
                          </Badge>
                        </div>
                      </TableHead>
                    </TableRow>
                    <TableRow>
                      {/* TAHAP I - Green theme */}
                      <TableHead className="text-center border border-green-200 font-bold text-gray-800 p-2 bg-green-300">
                        I
                      </TableHead>
                      <TableHead className="text-center border border-green-200 font-bold text-gray-800 p-2 bg-green-300">
                        II
                      </TableHead>
                      <TableHead className="text-center border border-green-200 font-bold text-gray-800 p-2 bg-green-300">
                        III
                      </TableHead>
                      <TableHead className="text-center border border-green-200 font-bold text-gray-800 p-2 bg-green-300">
                        IV
                      </TableHead>
                      <TableHead className="text-center border border-green-200 font-bold text-gray-800 p-2 bg-green-300">
                        Total
                      </TableHead>
                      <TableHead className="text-center border border-green-200 font-bold text-gray-800 p-2 bg-green-300">
                        %
                      </TableHead>
                      {/* TAHAP II - Blue theme */}
                      <TableHead className="text-center border border-blue-200 font-bold text-gray-800 p-2 bg-blue-300">
                        I
                      </TableHead>
                      <TableHead className="text-center border border-blue-200 font-bold text-gray-800 p-2 bg-blue-300">
                        II
                      </TableHead>
                      <TableHead className="text-center border border-blue-200 font-bold text-gray-800 p-2 bg-blue-300">
                        III
                      </TableHead>
                      <TableHead className="text-center border border-blue-200 font-bold text-gray-800 p-2 bg-blue-300">
                        IV
                      </TableHead>
                      <TableHead className="text-center border border-blue-200 font-bold text-gray-800 p-2 bg-blue-300">
                        Total
                      </TableHead>
                      <TableHead className="text-center border border-blue-200 font-bold text-gray-800 p-2 bg-blue-300">
                        %
                      </TableHead>
                      {/* TAHAP III - Purple theme */}
                      <TableHead className="text-center border border-purple-200 font-bold text-gray-800 p-2 bg-purple-300">
                        I
                      </TableHead>
                      <TableHead className="text-center border border-purple-200 font-bold text-gray-800 p-2 bg-purple-300">
                        II
                      </TableHead>
                      <TableHead className="text-center border border-purple-200 font-bold text-gray-800 p-2 bg-purple-300">
                        III
                      </TableHead>
                      <TableHead className="text-center border border-purple-200 font-bold text-gray-800 p-2 bg-purple-300">
                        IV
                      </TableHead>
                      <TableHead className="text-center border border-purple-200 font-bold text-gray-800 p-2 bg-purple-300">
                        Total
                      </TableHead>
                      <TableHead className="text-center border border-purple-200 font-bold text-gray-800 p-2 bg-purple-300">
                        %
                      </TableHead>
                      {/* TAHAP IV - Amber theme */}
                      <TableHead className="text-center border border-red-200 font-bold text-gray-800 p-2 bg-red-300">
                        I
                      </TableHead>
                      <TableHead className="text-center border border-red-200 font-bold text-gray-800 p-2 bg-red-300">
                        II
                      </TableHead>
                      <TableHead className="text-center border border-red-200 font-bold text-gray-800 p-2 bg-red-300">
                        III
                      </TableHead>
                      <TableHead className="text-center border border-red-200 font-bold text-gray-800 p-2 bg-red-300">
                        IV
                      </TableHead>
                      <TableHead className="text-center border border-red-200 font-bold text-gray-800 p-2 bg-red-300">
                        Total
                      </TableHead>
                      <TableHead className="text-center border border-red-200 font-bold text-gray-800 p-2 bg-red-300">
                        %
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tableData.map((row) => {
                      const totals = calculateTotals(row);

                      return (
                        <TableRow key={row.no} className="">
                          <TableCell className="text-center border">
                            {row.no}
                          </TableCell>
                          <TableCell className="text-center border font-medium">
                            {row.namaPerusahaan}
                          </TableCell>

                          {/* TAHAP I */}
                          <TableCell className="text-center border bg-green-50">
                            {formatNumber(row.capaianMonokultur.i)}
                          </TableCell>
                          <TableCell className="text-center border bg-green-50">
                            {formatNumber(row.capaianTumpangSari.i)}
                          </TableCell>
                          <TableCell className="text-center border bg-green-50">
                            {formatNumber(row.capaianCSR.i)}
                          </TableCell>
                          <TableCell className="text-center border bg-green-50">
                            {formatNumber(0)}
                          </TableCell>
                          <TableCell className="text-center border bg-green-50">
                            {formatNumber(Number(totals.phase1.total))}
                          </TableCell>
                          <TableCell className="text-center border bg-green-50">
                            {totals.phase1.percentage}%
                          </TableCell>

                          {/* TAHAP II */}
                          <TableCell className="text-center border bg-blue-50">
                            {formatNumber(row.capaianMonokultur.ii)}
                          </TableCell>
                          <TableCell className="text-center border bg-blue-50">
                            {formatNumber(row.capaianTumpangSari.ii)}
                          </TableCell>
                          <TableCell className="text-center border bg-blue-50">
                            {formatNumber(row.capaianCSR.ii)}
                          </TableCell>
                          <TableCell className="text-center border bg-blue-50">
                            {formatNumber(0)}
                          </TableCell>
                          <TableCell className="text-center border bg-blue-50">
                            {formatNumber(Number(totals.phase2.total))}
                          </TableCell>
                          <TableCell className="text-center border bg-blue-50">
                            {totals.phase2.percentage}%
                          </TableCell>

                          {/* TAHAP III */}
                          <TableCell className="text-center border bg-purple-50">
                            {formatNumber(row.capaianMonokultur.iii)}
                          </TableCell>
                          <TableCell className="text-center border bg-purple-50">
                            {formatNumber(row.capaianTumpangSari.iii)}
                          </TableCell>
                          <TableCell className="text-center border bg-purple-50">
                            {formatNumber(row.capaianCSR.iii)}
                          </TableCell>
                          <TableCell className="text-center border bg-purple-50">
                            {formatNumber(0)}
                          </TableCell>
                          <TableCell className="text-center border bg-purple-50">
                            {formatNumber(Number(totals.phase3.total))}
                          </TableCell>
                          <TableCell className="text-center border bg-purple-50">
                            {totals.phase3.percentage}%
                          </TableCell>

                          {/* TAHAP IV */}
                          <TableCell className="text-center border bg-red-50">
                            {formatNumber(row.capaianMonokultur.iv)}
                          </TableCell>
                          <TableCell className="text-center border bg-red-50">
                            {formatNumber(row.capaianTumpangSari.iv)}
                          </TableCell>
                          <TableCell className="text-center border bg-red-50">
                            {formatNumber(row.capaianCSR.iv)}
                          </TableCell>
                          <TableCell className="text-center border bg-red-50">
                            {formatNumber(0)}
                          </TableCell>
                          <TableCell className="text-center border bg-red-50">
                            {formatNumber(Number(totals.phase4.total))}
                          </TableCell>
                          <TableCell className="text-center border bg-red-50">
                            {totals.phase4.percentage}%
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                  <TableCaption className="mt-4 mb-2 text-sm text-gray-600 bg-blue-50 p-2 rounded">
                    <div className="flex items-center justify-center">
                      <Info className="w-4 h-4 mr-2 text-blue-600" />
                      Detail Data Tabel Perangkingan Kabupaten/Kota
                    </div>
                  </TableCaption>
                </Table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="chart">
            <Card className="border-amber-200">
              <CardHeader className="pb-2 bg-amber-50">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-semibold text-amber-800">
                    Visualisasi Capaian Kabupaten/Kota
                  </CardTitle>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Info className="h-4 w-4" />
                        <span className="sr-only">Info</span>
                      </Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold">
                          Tentang Grafik
                        </h4>
                        <p className="text-sm">
                          Grafik ini menampilkan perbandingan capaian dari
                          setiap tahapan untuk semua kabupaten/kota.
                        </p>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </div>
              </CardHeader>
              <CardContent className="pt-2 pb-3">
                <div className="h-[28rem] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={chartData}
                      margin={{ top: 10, right: 30, left: 20, bottom: 70 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="name"
                        angle={-45}
                        textAnchor="end"
                        height={80}
                        interval={0}
                        tick={{ fill: "#78350f", fontSize: 11 }}
                      />
                      <YAxis
                        tick={{ fill: "#78350f" }}
                        label={{
                          value: "Nilai Capaian",
                          angle: -90,
                          position: "insideLeft",
                          style: { fill: "#78350f" },
                        }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#fffbeb",
                          borderColor: "#fbbf24",
                          borderRadius: "6px",
                        }}
                      />
                      <Legend wrapperStyle={{ paddingTop: "8px" }} />
                      <Bar
                        dataKey="TAHAP_I"
                        fill="#4ade80"
                        name="TAHAP I"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar
                        dataKey="TAHAP_II"
                        fill="#60a5fa"
                        name="TAHAP II"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar
                        dataKey="TAHAP_III"
                        fill="#a78bfa"
                        name="TAHAP III"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar
                        dataKey="TAHAP_IV"
                        fill="#FCA5A5"
                        name="TAHAP IV"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-2 p-2 bg-amber-50 rounded text-sm text-center border border-amber-200">
                  Perbandingan Rekapan Dari Setiap Kabupaten/Kota
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TabbedDataView;

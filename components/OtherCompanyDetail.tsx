import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Building2,
  Calendar,
  Database,
  Phone,
  Table,
  Target,
  User,
  Warehouse,
} from "lucide-react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  LineChart,
  Line,
  Legend,
  Label,
} from "recharts";
import { Company } from "@/types";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

interface CompanyDetailProps {
  company: Company;
  isOpen: boolean;
  onClose: () => void;
}

const OtherCompanyDetail: React.FC<CompanyDetailProps> = ({
  company,
  isOpen,
  onClose,
}) => {
  if (!company) return null;

  const transformPeriodData = () => {
    return (["I", "II", "III", "IV"] as const).map((period) => ({
      periode: period,

      monoAchievement:
        company.monokulturAchievements[
          period as keyof typeof company.monokulturAchievements
        ],

      tsAchievement:
        company.tumpangSariAchievements[
          period as keyof typeof company.tumpangSariAchievements
        ],
      csrAchievement: (company.csrAchievements ?? {})[
        period as keyof typeof company.csrAchievements
      ],
    }));
  };

  const periodData = transformPeriodData();

  // Data for pie chart
  const targetDistribution = [
    {
      name: "Total Capaian Monokultur",
      value: company.monokulturAchievements.III,
      fill: "hsl(var(--chart-1))",
    },
    {
      name: "Total Capaian Tumpang Sari",
      value: company.tumpangSariAchievements.III,
      fill: "hsl(var(--chart-2))",
    },
    {
      name: "Total Capaian CSR",
      value: company.csrAchievements?.III,
      fill: "hsl(var(--chart-2))",
    },
    {
      name: "Sisa Lahan",
      value:
        company.area -
        (company.monokulturAchievements.III +
          company.tumpangSariAchievements.III +
          (company.csrAchievements?.III ?? 0)),
      fill: "hsl(var(--chart-3))",
    },
  ];

  const totalArea = company.area;

  const renderProgressSection = (
    title: string,
    data: {
      targetTanam: { luas: number; persentase: number };
      waktuTanam: string;
      progresTanam: { luas: number; persentase: number };
      belumTanam: { luas: number; persentase: number };
      panen: { luas: number; persentase: number };
      keterangan: string;
      rencanaTanam: { tanggalTanam: string; luasTanam: number };
      rencanaPanen: { tanggalPanen: string; perkiraanPanen: number };
    }
  ) => {
    const progressData = [
      {
        name: "Sudah Tanam",
        value: data.progresTanam.persentase,
        luas: data.progresTanam.luas,
        fill: "#22c55e",
      },
      {
        name: "Belum Tanam",
        value: data.belumTanam.persentase,
        luas: data.belumTanam.luas,
        fill: "#ef4444",
      },
      {
        name: "Panen",
        value: data.panen.persentase,
        luas: data.panen.luas,
        fill: "#eab308",
      },
    ];

    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-sm font-medium">
            Progress {title}
          </CardTitle>
          <CardDescription>
            Target Tanam:{" "}
            {data.targetTanam.luas.toLocaleString("id-ID", {
              maximumFractionDigits: 2,
            })}{" "}
            Ha (
            {data.targetTanam.persentase.toLocaleString("id-ID", {
              maximumFractionDigits: 2,
            })}
            %)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={progressData}
                    dataKey="luas"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={75}
                    outerRadius={100}
                    label
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="rounded-lg border bg-background p-2 shadow-sm">
                            <div className="grid grid-cols-2 gap-2">
                              <div className="flex flex-col">
                                <span className="text-[0.70rem] uppercase text-muted-foreground">
                                  {data.name}
                                </span>
                                <span className="font-bold">
                                  {data.value.toLocaleString("id-ID", {
                                    maximumFractionDigits: 2,
                                  })}
                                  % (
                                  {data.luas.toLocaleString("id-ID", {
                                    maximumFractionDigits: 2,
                                  })}{" "}
                                  Ha)
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Waktu Tanam: {data.waktuTanam}</span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Sudah Tanam</span>
                  <span className="font-medium">
                    {data.progresTanam.luas.toLocaleString("id-ID", {
                      maximumFractionDigits: 2,
                    })}{" "}
                    Ha (
                    {data.progresTanam.persentase.toLocaleString("id-ID", {
                      maximumFractionDigits: 2,
                    })}
                    %)
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Belum Tanam</span>
                  <span className="font-medium">
                    {data.belumTanam.luas.toLocaleString("id-ID", {
                      maximumFractionDigits: 2,
                    })}{" "}
                    Ha (
                    {data.belumTanam.persentase.toLocaleString("id-ID", {
                      maximumFractionDigits: 2,
                    })}
                    %)
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Panen</span>
                  <span className="font-medium">
                    {data.panen.luas.toLocaleString("id-ID", {
                      maximumFractionDigits: 2,
                    })}{" "}
                    Ha (
                    {data.panen.persentase.toLocaleString("id-ID", {
                      maximumFractionDigits: 2,
                    })}
                    %)
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Keterangan:</h4>
                <p className="text-sm text-muted-foreground">
                  {data.keterangan}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="md:max-w-6xl max-h-[95%] w-[95%] overflow-y-auto rounded-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="hidden md:block w-5 h-5 text-blue-500" />
            {company.name}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full h-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-0">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="progress">
              Monokultur & Tumpang Sari
            </TabsTrigger>
            <TabsTrigger value="csr">CSR</TabsTrigger>
            <TabsTrigger value="prosesProduksi">Proses Produksi</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 gap-4">
              <Card>
                <CardHeader className="items-center">
                  <CardTitle className="text-sm font-medium">
                    Total Lahan
                  </CardTitle>
                  <CardDescription>Distribusi Lahan</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Tooltip
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="rounded-lg border bg-background p-2 shadow-sm">
                                  <div className="grid grid-cols-2 gap-2">
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
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Pie
                          data={targetDistribution}
                          dataKey="value"
                          nameKey="name"
                          innerRadius={75}
                          outerRadius={100}
                          strokeWidth={5}
                        >
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
                                      {totalArea.toLocaleString("id-ID", {
                                        maximumFractionDigits: 2,
                                      })}
                                    </tspan>
                                    <tspan
                                      x={viewBox.cx}
                                      y={(viewBox.cy || 0) + 24}
                                      className="fill-muted-foreground"
                                    >
                                      Total (Ha)
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
                  <div className="w-full grid grid-cols-1 gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: "hsl(var(--chart-1))" }}
                        ></div>
                        <span className="text-sm text-muted-foreground">
                          Total Capaian Monokultur
                        </span>
                      </div>
                      <span className="text-sm font-medium">
                        {company.monokulturAchievements.III.toLocaleString(
                          "id-ID",
                          {
                            maximumFractionDigits: 2,
                          }
                        )}{" "}
                        Ha
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: "hsl(var(--chart-2))" }}
                        ></div>
                        <span className="text-sm text-muted-foreground">
                          Total Capaian Tumpang Sari
                        </span>
                      </div>
                      <span className="text-sm font-medium">
                        {company.tumpangSariAchievements.III.toLocaleString(
                          "id-ID",
                          {
                            maximumFractionDigits: 2,
                          }
                        )}{" "}
                        Ha
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: "hsl(var(--chart-2))" }}
                        ></div>
                        <span className="text-sm text-muted-foreground">
                          Total Capaian CSR
                        </span>
                      </div>
                      <span className="text-sm font-medium">
                        {company.csrAchievements?.III.toLocaleString("id-ID", {
                          maximumFractionDigits: 2,
                        })}{" "}
                        Ha
                      </span>
                    </div>
                    {/* <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: "hsl(var(--chart-3))" }}
                        ></div>
                        <span className="text-sm text-muted-foreground">
                          Total Lahan
                        </span>
                      </div>
                      <span className="text-sm font-medium">
                        {company.area.toLocaleString("id-ID", {
                          maximumFractionDigits: 2,
                        })}{" "}
                        Ha
                        {(
                          company.area -
                          (Object.values(
                            company.monokulturAchievements || {}
                          ).reduce((acc, val) => acc + val, 0) +
                            Object.values(
                              company.tumpangSariAchievements || {}
                            ).reduce((acc, val) => acc + val, 0) +
                            Object.values(company.csrAchievements || {}).reduce(
                              (acc, val) => acc + val,
                              0
                            ))
                        ).toLocaleString("id-ID", {
                          maximumFractionDigits: 2,
                        })}{" "}
                        Ha
                      </span>
                    </div> */}
                  </div>
                  <div className="w-full pt-2 border-t">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4" />
                        <span className="text-sm text-muted-foreground">
                          Total Lahan
                        </span>
                      </div>
                      <span className="text-sm font-medium">
                        {company.area.toLocaleString("id-ID", {
                          maximumFractionDigits: 2,
                        })}{" "}
                        Ha
                      </span>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="progress">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-gray-500">
                    Capaian Monokultur per Periode
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={periodData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="periode" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="monoAchievement"
                          name="Pencapaian"
                          stroke="#3b82f6"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="w-full pt-2 border-t">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4" />
                        <span className="text-sm text-muted-foreground">
                          Total Capaian Monokultur
                        </span>
                      </div>
                      <span className="text-sm font-medium">
                        {company.monokulturAchievements.III.toLocaleString(
                          "id-ID",
                          {
                            maximumFractionDigits: 2,
                          }
                        )}{" "}
                        Ha
                      </span>
                    </div>
                  </div>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-gray-500">
                    Capaian Tumpang Sari per Periode
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={periodData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="periode" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="tsAchievement"
                          name="Pencapaian"
                          stroke="#3b82f6"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="w-full pt-2 border-t">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4" />
                        <span className="text-sm text-muted-foreground">
                          Total Capaian Tumpang Sari
                        </span>
                      </div>
                      <span className="text-sm font-medium">
                        {company.tumpangSariAchievements.III.toLocaleString(
                          "id-ID",
                          {
                            maximumFractionDigits: 2,
                          }
                        )}{" "}
                        Ha
                      </span>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="csr">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-500">
                  Capaian CSR per Periode
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={periodData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="periode" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="csrAchievement"
                        name="Pencapaian"
                        stroke="#3b82f6"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter>
                <div className="w-full pt-2 border-t">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      <span className="text-sm text-muted-foreground">
                        Total Capaian CSR
                      </span>
                    </div>
                    <span className="text-sm font-medium">
                      {company.csrAchievements?.III.toLocaleString("id-ID", {
                        maximumFractionDigits: 2,
                      })}{" "}
                      Ha
                    </span>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="prosesProduksi">
            <div className="space-y-4">
              {company.progress && company.progress.length > 0 ? (
                <>
                  <Card className="w-full">
                    <CardHeader>
                      <CardTitle className="text-sm font-medium">
                        Informasi Penanggung Jawab
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-500 " />
                          <span className="text-sm">
                            Nama: {company.progress?.[0]?.namaPJ}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">
                            No. Telp: {company.progress?.[0]?.nomorTelp}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Progress Tanaman</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Rencana Tanam Table */}
                        <Card className="w-full">
                          <CardHeader className="pb-4">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-5 w-5 text-green-600" />
                              <CardTitle className="text-lg font-semibold text-green-600">
                                Rencana Tanam
                              </CardTitle>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <Table>
                              <TableHeader className="bg-green-50">
                                <TableRow>
                                  <TableHead className="font-bold">
                                    Parameter
                                  </TableHead>
                                  <TableHead className="text-right">
                                    Nilai
                                  </TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                <TableRow>
                                  <TableCell className="font-medium">
                                    Tanggal Tanam
                                  </TableCell>
                                  <TableCell className="text-right">
                                    {/* {data.rencanaTanam?.tanggalTanam || "-"} */}
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell className="font-medium">
                                    Luas Lahan
                                  </TableCell>
                                  <TableCell className="text-right">
                                    {/* {data.rencanaTanam?.luasTanam.toLocaleString(
                                      "id-ID",
                                      {
                                        maximumFractionDigits: 2,
                                      }
                                    )}{" "} */}
                                    Ha
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </CardContent>
                        </Card>

                        {/* Rencana Panen Table */}
                        <Card className="w-full">
                          <CardHeader className="pb-4">
                            <div className="flex items-center gap-2">
                              <Warehouse className="h-5 w-5 text-blue-600" />
                              <CardTitle className="text-lg font-semibold text-blue-600">
                                Rencana Panen
                              </CardTitle>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <Table>
                              <TableHeader className="bg-blue-50">
                                <TableRow>
                                  <TableHead className="font-bold">
                                    Parameter
                                  </TableHead>
                                  <TableHead className="text-right">
                                    Nilai
                                  </TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                <TableRow>
                                  <TableCell className="font-medium">
                                    Tanggal Panen
                                  </TableCell>
                                  <TableCell className="text-right">
                                    {/* {data.rencanaPanen?.tanggalPanen || "-"} */}
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell className="font-medium">
                                    Perkiraan Panen
                                  </TableCell>
                                  <TableCell className="text-right">
                                    {/* {data.rencanaPanen?.perkiraanPanen.toLocaleString(
                                      "id-ID",
                                      {
                                        maximumFractionDigits: 2,
                                      }
                                    )}{" "} */}
                                    Ton
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </CardContent>
                        </Card>
                      </div>
                    </CardContent>
                  </Card>

                  {company.progress?.[0]?.monokultur &&
                    renderProgressSection("Monokultur", {
                      ...company.progress[0].monokultur,
                      targetTanam: {
                        luas:
                          company.progress[0].monokultur.targetTanam.luas ?? 0,
                        persentase:
                          company.progress[0].monokultur.targetTanam
                            .persentase ?? 0,
                      },
                      progresTanam: {
                        luas:
                          company.progress[0].monokultur.progresTanam.luas ?? 0,
                        persentase:
                          company.progress[0].monokultur.progresTanam
                            .persentase ?? 0,
                      },
                      belumTanam: {
                        luas:
                          company.progress[0].monokultur.belumTanam.luas ?? 0,
                        persentase:
                          company.progress[0].monokultur.belumTanam
                            .persentase ?? 0,
                      },
                      panen: {
                        luas: company.progress[0].monokultur.panen.luas ?? 0,
                        persentase:
                          company.progress[0].monokultur.panen.persentase ?? 0,
                      },
                      keterangan:
                        company.progress[0].monokultur.keterangan ?? "",
                      rencanaTanam: {
                        tanggalTanam:
                          company.progress[0].monokultur.rencanaTanam
                            ?.tanggalTanam ?? "",
                        luasTanam:
                          company.progress[0].monokultur.rencanaTanam
                            ?.luasTanam ?? 0,
                      },
                      rencanaPanen: {
                        tanggalPanen:
                          company.progress[0].monokultur.rencanaPanen
                            ?.tanggalPanen ?? "",
                        perkiraanPanen:
                          company.progress[0].monokultur.rencanaPanen
                            ?.perkiraanPanen ?? 0,
                      },
                    })}

                  {company.progress?.[0]?.tumpangSari &&
                    renderProgressSection("Tumpang Sari", {
                      ...company.progress[0].tumpangSari,
                      targetTanam: {
                        luas:
                          company.progress[0].tumpangSari.targetTanam.luas ?? 0,
                        persentase:
                          company.progress[0].tumpangSari.targetTanam
                            .persentase ?? 0,
                      },
                      progresTanam: {
                        luas:
                          company.progress[0].tumpangSari.progresTanam.luas ??
                          0,
                        persentase:
                          company.progress[0].tumpangSari.progresTanam
                            .persentase ?? 0,
                      },
                      belumTanam: {
                        luas:
                          company.progress[0].tumpangSari.belumTanam.luas ?? 0,
                        persentase:
                          company.progress[0].tumpangSari.belumTanam
                            .persentase ?? 0,
                      },
                      panen: {
                        luas: company.progress[0].tumpangSari.panen.luas ?? 0,
                        persentase:
                          company.progress[0].tumpangSari.panen.persentase ?? 0,
                      },
                      keterangan:
                        company.progress[0].tumpangSari.keterangan ?? "",
                      rencanaTanam: {
                        tanggalTanam:
                          company.progress[0].tumpangSari.rencanaTanam
                            ?.tanggalTanam ?? "",
                        luasTanam:
                          company.progress[0].tumpangSari.rencanaTanam
                            ?.luasTanam ?? 0,
                      },
                      rencanaPanen: {
                        tanggalPanen:
                          company.progress[0].tumpangSari.rencanaPanen
                            ?.tanggalPanen ?? "",
                        perkiraanPanen:
                          company.progress[0].tumpangSari.rencanaPanen
                            ?.perkiraanPanen ?? 0,
                      },
                    })}

                  {company.progress?.[0]?.csr &&
                    renderProgressSection("CSR", {
                      ...company.progress[0].csr,
                      targetTanam: {
                        luas: company.progress[0].csr.targetTanam.luas ?? 0,
                        persentase:
                          company.progress[0].csr.targetTanam.persentase ?? 0,
                      },
                      progresTanam: {
                        luas: company.progress[0].csr.progresTanam.luas ?? 0,
                        persentase:
                          company.progress[0].csr.progresTanam.persentase ?? 0,
                      },
                      belumTanam: {
                        luas: company.progress[0].csr.belumTanam.luas ?? 0,
                        persentase:
                          company.progress[0].csr.belumTanam.persentase ?? 0,
                      },
                      panen: {
                        luas: company.progress[0].csr.panen.luas ?? 0,
                        persentase:
                          company.progress[0].csr.panen.persentase ?? 0,
                      },
                      keterangan: company.progress[0].csr.keterangan ?? "",
                      rencanaTanam: {
                        tanggalTanam:
                          company.progress[0].csr.rencanaTanam?.tanggalTanam ??
                          "",
                        luasTanam:
                          company.progress[0].csr.rencanaTanam?.luasTanam ?? 0,
                      },
                      rencanaPanen: {
                        tanggalPanen:
                          company.progress[0].csr.rencanaPanen?.tanggalPanen ??
                          "",
                        perkiraanPanen:
                          company.progress[0].csr.rencanaPanen
                            ?.perkiraanPanen ?? 0,
                      },
                    })}
                </>
              ) : (
                <div className="h-[400px] flex items-center justify-center text-center flex-col gap-2">
                  <Database className="h-10 w-10 text-emerald-800" />
                  <span className="text-emerald-800 text-xl text-center">
                    Data proses produksi belum dimasukkan...
                  </span>
                </div>
              )}
            </div>
          </TabsContent>

          {/* <TabsContent value="prosesProduksi">
            <div className="space-y-4">
              {company.progress && company.progress.length > 0 ? (
                <>
                  <Card className="w-full">
                    <CardHeader>
                      <CardTitle className="text-sm font-medium">
                        Informasi Penanggung Jawab
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-500 " />
                          <span className="text-sm font-bold">
                            Nama : {company.progress?.[0]?.namaPJ}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-500" />
                          <span className="text-sm font-bold">
                            No. Telp: {company.progress?.[0]?.nomorTelp}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Progress Tanam</CardTitle>
                    </CardHeader>
                    <CardContent>
                                            
                      <div>
                        <h4>Target Tanam:</h4>
                        <p>
                          Luas:{" "}
                          {data.targetTanam.luas.toLocaleString("id-ID", {
                            maximumFractionDigits: 2,
                          })}{" "}
                          Ha (
                          {data.targetTanam.persentase.toLocaleString("id-ID", {
                            maximumFractionDigits: 2,
                          })}
                          %)
                        </p>
                      </div>
                      
                      <div>
                        <h4>Rencana Tanam:</h4>
                        <p>
                          Tanggal Tanam:{" "}
                          {data.rencanaTanam?.tanggalTanam || "-"}
                        </p>
                        <p>
                          Luas Tanam:{" "}
                          {data.rencanaTanam?.luasTanam.toLocaleString(
                            "id-ID",
                            {
                              maximumFractionDigits: 2,
                            }
                          )}{" "}
                          Ha
                        </p>
                      </div>
                      
                      <div>
                        <h4>Rencana Panen:</h4>
                        <p>
                          Tanggal Panen:{" "}
                          {data.rencanaPanen?.tanggalPanen || "-"}
                        </p>
                        <p>
                          Perkiraan Panen:{" "}
                          {data.rencanaPanen?.perkiraanPanen.toLocaleString(
                            "id-ID",
                            {
                              maximumFractionDigits: 2,
                            }
                          )}{" "}
                          Ton
                        </p>
                      </div>

                      <div>
                        <h4>Progres Tanam:</h4>
                        <p>
                          Sudah Tanam:{" "}
                          {data.progresTanam.luas.toLocaleString("id-ID", {
                            maximumFractionDigits: 2,
                          })}{" "}
                          Ha (
                          {data.progresTanam.persentase.toLocaleString(
                            "id-ID",
                            {
                              maximumFractionDigits: 2,
                            }
                          )}
                          %)
                        </p>
                        <p>
                          Belum Tanam:{" "}
                          {data.belumTanam.luas.toLocaleString("id-ID", {
                            maximumFractionDigits: 2,
                          })}{" "}
                          Ha (
                          {data.belumTanam.persentase.toLocaleString("id-ID", {
                            maximumFractionDigits: 2,
                          })}
                          %)
                        </p>
                        <p>
                          Panen:{" "}
                          {data.panen.luas.toLocaleString("id-ID", {
                            maximumFractionDigits: 2,
                          })}{" "}
                          Ha (
                          {data.panen.persentase.toLocaleString("id-ID", {
                            maximumFractionDigits: 2,
                          })}
                          %)
                        </p>
                      </div>

                      
                      <div>
                        <h4>Keterangan:</h4>
                        <p>{data.keterangan}</p>
                      </div> 
                       
                    </CardContent>
                  </Card>

                  {company.progress?.[0]?.monokultur &&
                    renderProgressSection("Monokultur", {
                      ...company.progress[0].monokultur,
                      targetTanam: {
                        luas:
                          company.progress[0].monokultur.targetTanam.luas ?? 0,
                        persentase:
                          company.progress[0].monokultur.targetTanam
                            .persentase ?? 0,
                      },
                      progresTanam: {
                        luas:
                          company.progress[0].monokultur.progresTanam.luas ?? 0,
                        persentase:
                          company.progress[0].monokultur.progresTanam
                            .persentase ?? 0,
                      },
                      belumTanam: {
                        luas:
                          company.progress[0].monokultur.belumTanam.luas ?? 0,
                        persentase:
                          company.progress[0].monokultur.belumTanam
                            .persentase ?? 0,
                      },
                      panen: {
                        luas: company.progress[0].monokultur.panen.luas ?? 0,
                        persentase:
                          company.progress[0].monokultur.panen.persentase ?? 0,
                      },
                      keterangan:
                        company.progress[0].monokultur.keterangan ?? "",
                      rencanaTanam: {
                        tanggalTanam:
                          company.progress[0].monokultur.rencanaTanam
                            ?.tanggalTanam ?? "",
                        luasTanam:
                          company.progress[0].monokultur.rencanaTanam
                            ?.luasTanam ?? 0,
                      },
                      rencanaPanen: {
                        tanggalPanen:
                          company.progress[0].monokultur.rencanaPanen
                            ?.tanggalPanen ?? "",
                        perkiraanPanen:
                          company.progress[0].monokultur.rencanaPanen
                            ?.perkiraanPanen ?? 0,
                      },
                    })}

                  {company.progress?.[0]?.tumpangSari &&
                    renderProgressSection("Tumpang Sari", {
                      ...company.progress[0].tumpangSari,
                      targetTanam: {
                        luas:
                          company.progress[0].tumpangSari.targetTanam.luas ?? 0,
                        persentase:
                          company.progress[0].tumpangSari.targetTanam
                            .persentase ?? 0,
                      },
                      progresTanam: {
                        luas:
                          company.progress[0].tumpangSari.progresTanam.luas ??
                          0,
                        persentase:
                          company.progress[0].tumpangSari.progresTanam
                            .persentase ?? 0,
                      },
                      belumTanam: {
                        luas:
                          company.progress[0].tumpangSari.belumTanam.luas ?? 0,
                        persentase:
                          company.progress[0].tumpangSari.belumTanam
                            .persentase ?? 0,
                      },
                      panen: {
                        luas: company.progress[0].tumpangSari.panen.luas ?? 0,
                        persentase:
                          company.progress[0].tumpangSari.panen.persentase ?? 0,
                      },
                      keterangan:
                        company.progress[0].tumpangSari.keterangan ?? "",
                      rencanaTanam: {
                        tanggalTanam:
                          company.progress[0].monokultur.rencanaTanam
                            ?.tanggalTanam ?? "",
                        luasTanam:
                          company.progress[0].monokultur.rencanaTanam
                            ?.luasTanam ?? 0,
                      },
                      rencanaPanen: {
                        tanggalPanen:
                          company.progress[0].monokultur.rencanaPanen
                            ?.tanggalPanen ?? "",
                        perkiraanPanen:
                          company.progress[0].monokultur.rencanaPanen
                            ?.perkiraanPanen ?? 0,
                      },
                    })}

                  {company.progress?.[0]?.csr &&
                    renderProgressSection("CSR", {
                      ...company.progress[0].csr,
                      targetTanam: {
                        luas: company.progress[0].csr.targetTanam.luas ?? 0,
                        persentase:
                          company.progress[0].csr.targetTanam.persentase ?? 0,
                      },
                      progresTanam: {
                        luas: company.progress[0].csr.progresTanam.luas ?? 0,
                        persentase:
                          company.progress[0].csr.progresTanam.persentase ?? 0,
                      },
                      belumTanam: {
                        luas: company.progress[0].csr.belumTanam.luas ?? 0,
                        persentase:
                          company.progress[0].csr.belumTanam.persentase ?? 0,
                      },
                      panen: {
                        luas: company.progress[0].csr.panen.luas ?? 0,
                        persentase:
                          company.progress[0].csr.panen.persentase ?? 0,
                      },
                      keterangan: company.progress[0].csr.keterangan ?? "",
                      rencanaTanam: {
                        tanggalTanam:
                          company.progress[0].monokultur.rencanaTanam
                            ?.tanggalTanam ?? "",
                        luasTanam:
                          company.progress[0].monokultur.rencanaTanam
                            ?.luasTanam ?? 0,
                      },
                      rencanaPanen: {
                        tanggalPanen:
                          company.progress[0].monokultur.rencanaPanen
                            ?.tanggalPanen ?? "",
                        perkiraanPanen:
                          company.progress[0].monokultur.rencanaPanen
                            ?.perkiraanPanen ?? 0,
                      },
                    })}
                </>
              ) : (
                <div className="h-[400px] flex items-center justify-center text-center flex-col gap-2">
                  <Database className="h-10 w-10 text-emerald-800" />
                  <span className="text-emerald-800 text-xl text-center">
                    Data proses produksi belum dimasukkan...
                  </span>
                </div>
              )}
            </div>
          </TabsContent> */}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default OtherCompanyDetail;

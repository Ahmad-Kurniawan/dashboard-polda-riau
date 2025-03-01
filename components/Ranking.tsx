"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHeader,
} from "@/components/ui/table";
import { Trophy } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { City } from "@/types";

interface CityWithScore extends City {
  totalAchievements: number;
  totalPercentage: number;
}

const calculateRanking = (
  cities: City[],
  week: "II" | "III"
): CityWithScore[] => {
  const rankedCities = cities.map((city) => {
    // Pilih minggu berdasarkan parameter `week`
    const monokulturKey = week;
    const tumpangSariKey = week;
    const csrKey = week;

    const totalMonokulturAchievements = city.companies.reduce(
      (sum, company) =>
        sum + (company.monokulturAchievements[monokulturKey] || 0),
      0
    );
    const totalMonokulturAchievementsOther = city.otherCompanies?.reduce(
      (sum, company) =>
        sum + (company.monokulturAchievements[monokulturKey] || 0),
      0
    );
    const totalMonokultur =
      totalMonokulturAchievements + (totalMonokulturAchievementsOther || 0);

    const totalTumpangSariAchievements = city.companies.reduce(
      (sum, company) =>
        sum + (company.tumpangSariAchievements[tumpangSariKey] || 0),
      0
    );
    const totalTumpangSariAchievementsOther = city.otherCompanies?.reduce(
      (sum, company) =>
        sum + (company.tumpangSariAchievements[tumpangSariKey] || 0),
      0
    );
    const totalTumpangSari =
      totalTumpangSariAchievements + (totalTumpangSariAchievementsOther || 0);

    const totalCSRAchievements = city.companies.reduce(
      (sum, company) => sum + (company.csrAchievements?.[csrKey] || 0),
      0
    );
    const totalCSRAchievementsOther = city.otherCompanies?.reduce(
      (sum, company) => sum + (company.csrAchievements?.[csrKey] || 0),
      0
    );
    const totalCSR = totalCSRAchievements + (totalCSRAchievementsOther || 0);

    const totalAchievements = totalMonokultur + totalTumpangSari + totalCSR;
    const totalPercentage =
      city.totalTarget > 0 ? (totalAchievements / city.totalTarget) * 100 : 0;

    return {
      ...city,
      totalAchievements,
      totalPercentage,
    };
  });

  rankedCities.sort((a, b) => b.totalAchievements - a.totalAchievements);
  return rankedCities;
};

const RankingComponent: React.FC<{ cities: City[] }> = ({ cities }) => {
  const [rankedCities, setRankedCities] = useState<CityWithScore[]>([]);
  const [activeTab, setActiveTab] = useState<"week2" | "week3">("week2");

  useEffect(() => {
    const weekKey = activeTab === "week2" ? "II" : "III";
    const ranking = calculateRanking(cities, weekKey);
    setRankedCities(ranking);
  }, [cities, activeTab]);

  return (
    <Card className="border-none rounded-xl shadow-lg hover:shadow-xl transition-all">
      <CardHeader className="rounded-t-xl bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardTitle className="flex items-center text-xl gap-2 text-blue-600">
          <Trophy className="w-5 h-5 hidden md:block" />
          Perankingan Kab/Kota
        </CardTitle>
        <CardDescription>
          Hasil perankingan (<span className="italic">fairness method</span>)
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 overflow-y-auto max-h-[500px]">
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "week2" | "week3")}
        >
          <TabsList className="grid w-full grid-cols-2 rounded-none">
            <TabsTrigger value="week2">Minggu Ke-2</TabsTrigger>
            <TabsTrigger value="week3">Minggu Ke-3</TabsTrigger>
          </TabsList>
          <TabsContent value="week2">
            <div className="pb-4 px-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableCell className="text-center font-bold">No</TableCell>
                    <TableCell className="p-4 font-bold">Kab/Kota</TableCell>
                    <TableCell className="p-4 text-center font-bold">
                      Total Capaian
                    </TableCell>
                    <TableCell className="p-4 text-center font-bold">
                      Persentase
                    </TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rankedCities.map((city, index) => (
                    <TableRow
                      key={city.id}
                      className="border-b hover:bg-blue-50/50 cursor-pointer transition-colors"
                    >
                      <TableCell
                        className={`text-center ${
                          index < 3 ? "font-bold text-lg" : ""
                        } ${index === 0 ? "text-yellow-500" : ""} ${
                          index === 1 ? "text-[#89939A]" : ""
                        } ${index === 2 ? "text-amber-700" : ""}`}
                      >
                        {index + 1}
                      </TableCell>
                      <TableCell
                        className={`p-4 ${index < 3 ? "font-bold" : ""} ${
                          index === 0 ? "text-yellow-500" : ""
                        } ${index === 1 ? "text-[#89939A]" : ""} ${
                          index === 2 ? "text-amber-700" : ""
                        }`}
                      >
                        {city.nama}
                      </TableCell>
                      <TableCell
                        className={`p-4 text-center ${
                          index < 3 ? "font-bold" : ""
                        } ${index === 0 ? "text-yellow-500" : ""} ${
                          index === 1 ? "text-[#89939A]" : ""
                        } ${index === 2 ? "text-amber-700" : ""}`}
                      >
                        {city.totalAchievements.toLocaleString("id-ID", {
                          maximumFractionDigits: 2,
                        })}{" "}
                        dari{" "}
                        {city.totalTarget.toLocaleString("id-ID", {
                          maximumFractionDigits: 2,
                        })}
                      </TableCell>
                      <TableCell
                        className={`p-4 text-center ${
                          index < 3 ? "font-bold" : ""
                        } ${index === 0 ? "text-yellow-500" : ""} ${
                          index === 1 ? "text-[#89939A]" : ""
                        } ${index === 2 ? "text-amber-700" : ""}`}
                      >
                        {city.totalPercentage.toLocaleString("id-ID", {
                          maximumFractionDigits: 2,
                        })}
                        %
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          <TabsContent value="week3">
            <div className="pb-4 px-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableCell className="text-center font-bold">No</TableCell>
                    <TableCell className="p-4 font-bold">Kab/Kota</TableCell>
                    <TableCell className="p-4 text-center font-bold">
                      Total Capaian
                    </TableCell>
                    <TableCell className="p-4 text-center font-bold">
                      Persentase
                    </TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rankedCities.map((city, index) => (
                    <TableRow
                      key={city.id}
                      className="border-b hover:bg-blue-50/50 cursor-pointer transition-colors"
                    >
                      <TableCell
                        className={`text-center ${
                          index < 3 ? "font-bold text-lg" : ""
                        } ${index === 0 ? "text-yellow-500" : ""} ${
                          index === 1 ? "text-[#89939A]" : ""
                        } ${index === 2 ? "text-amber-700" : ""}`}
                      >
                        {index + 1}
                      </TableCell>
                      <TableCell
                        className={`p-4 ${index < 3 ? "font-bold" : ""} ${
                          index === 0 ? "text-yellow-500" : ""
                        } ${index === 1 ? "text-[#89939A]" : ""} ${
                          index === 2 ? "text-amber-700" : ""
                        }`}
                      >
                        {city.nama}
                      </TableCell>
                      <TableCell
                        className={`p-4 text-center ${
                          index < 3 ? "font-bold" : ""
                        } ${index === 0 ? "text-yellow-500" : ""} ${
                          index === 1 ? "text-[#89939A]" : ""
                        } ${index === 2 ? "text-amber-700" : ""}`}
                      >
                        {city.totalAchievements.toLocaleString("id-ID", {
                          maximumFractionDigits: 2,
                        })}{" "}
                        dari{" "}
                        {city.totalTarget.toLocaleString("id-ID", {
                          maximumFractionDigits: 2,
                        })}
                      </TableCell>
                      <TableCell
                        className={`p-4 text-center ${
                          index < 3 ? "font-bold" : ""
                        } ${index === 0 ? "text-yellow-500" : ""} ${
                          index === 1 ? "text-[#89939A]" : ""
                        } ${index === 2 ? "text-amber-700" : ""}`}
                      >
                        {city.totalPercentage.toLocaleString("id-ID", {
                          maximumFractionDigits: 2,
                        })}
                        %
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default RankingComponent;

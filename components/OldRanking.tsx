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
import { City } from "@/types";

interface CityWithScore extends City {
  totalAchievements: number;
  totalPercentage: number;
}

const calculateRanking = (cities: City[]): CityWithScore[] => {
  // Cari Target Maksimum
  // const maxMonokulturTarget = Math.max(
  //   ...cities.map((city) => city.monokulturTarget)
  // );
  // const maxTumpangSariTarget = Math.max(
  //   ...cities.map((city) => city.tumpangSariTarget)
  // );

  // Hitung Skor untuk Setiap Kota
  const rankedCities = cities.map((city) => {
    // Hitung Total Capaian
    const totalMonokulturAchievements = city.companies.reduce(
      (sum, company) => sum + company.monokulturAchievements.II,
      0
    );
    const totalMonokulturAchievementsOther = city.otherCompanies?.reduce(
      (sum, company) => sum + company.monokulturAchievements.II,
      0
    );
    const totalMonokultur =
      totalMonokulturAchievements + (totalMonokulturAchievementsOther || 0);

    const totalTumpangSariAchievements = city.companies.reduce(
      (sum, company) => sum + company.tumpangSariAchievements.II,
      0
    );
    const totalTumpangSariAchievementsOther = city.otherCompanies?.reduce(
      (sum, company) => sum + company.tumpangSariAchievements.II,
      0
    );
    const totalTumpangSari =
      totalTumpangSariAchievements + (totalTumpangSariAchievementsOther || 0);

    const totalCSRAchievements = city.companies.reduce(
      (sum, company) => sum + (company.csrAchievements?.II || 0),
      0
    );
    const totalCSRAchievementsOther = city.otherCompanies?.reduce(
      (sum, company) => sum + (company.csrAchievements?.II || 0),
      0
    );
    const totalCSR = totalCSRAchievements + (totalCSRAchievementsOther || 0);

    const totalAchievements = totalMonokultur + totalTumpangSari + totalCSR;
    const totalPercentage =
      city.totalTarget > 0 ? (totalAchievements / city.totalTarget) * 100 : 0;

    // Hitung Persentase Capaian
    // const monokulturPercentage = city.monokulturTarget
    //   ? (totalMonokultur / city.monokulturTarget) * 100
    //   : 0;
    // const tumpangSariPercentage = city.tumpangSariTarget
    //   ? (totalTumpangSari / city.tumpangSariTarget) * 100
    //   : 0;

    // Hitung Bobot Target
    // const monokulturTargetWeight = maxMonokulturTarget
    //   ? city.monokulturTarget / maxMonokulturTarget
    //   : 0;
    // const tumpangSariTargetWeight = maxTumpangSariTarget
    //   ? city.tumpangSariTarget / maxTumpangSariTarget
    //   : 0;

    // Hitung Skor Final
    // const finalScore =
    //   (0.6 * monokulturPercentage +
    //     0.4 * monokulturTargetWeight * 100 +
    //     0.6 * tumpangSariPercentage +
    //     0.4 * tumpangSariTargetWeight * 100) /
    //   2;

    return {
      ...city,
      totalAchievements,
      totalPercentage,
      // finalScore,
    };
  });

  rankedCities.sort((a, b) => b.totalAchievements - a.totalAchievements);

  return rankedCities;
};

const OldRankingComponent: React.FC<{ cities: City[] }> = ({ cities }) => {
  const [rankedCities, setRankedCities] = useState<CityWithScore[]>([]);

  useEffect(() => {
    const ranking = calculateRanking(cities);
    setRankedCities(ranking);
  }, [cities]);

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
        <div className="py-2 px-4">
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
                {/* <TableCell className="p-4 text-center font-bold">
                  Skor
                </TableCell> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {rankedCities.map((city, index) => (
                <TableRow
                  key={city.id}
                  className="border-b hover:bg-blue-50/50 cursor-pointer transition-colors "
                >
                  <TableCell
                    className={`text-center
                    ${index < 3 ? "font-bold text-lg" : ""}
                    ${index === 0 ? "text-yellow-500" : ""}
                    ${index === 1 ? "text-[#89939A]" : ""}
                    ${index === 2 ? "text-amber-700" : ""}
                  `}
                  >
                    {index + 1}
                  </TableCell>
                  <TableCell
                    className={`p-4
                    ${index < 3 ? "font-bold" : ""}
                    ${index === 0 ? "text-yellow-500" : ""}
                    ${index === 1 ? "text-[#89939A]" : ""}
                    ${index === 2 ? "text-amber-700" : ""}
                  `}
                  >
                    {city.nama}
                  </TableCell>
                  <TableCell
                    className={`p-4 text-center
                    ${index < 3 ? "font-bold" : ""}
                    ${index === 0 ? "text-yellow-500" : ""}
                    ${index === 1 ? "text-[#89939A]" : ""}
                    ${index === 2 ? "text-amber-700" : ""}
                  `}
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
                    className={`p-4 text-center
                    ${index < 3 ? "font-bold" : ""}
                    ${index === 0 ? "text-yellow-500" : ""}
                    ${index === 1 ? "text-[#89939A]" : ""}
                    ${index === 2 ? "text-amber-700" : ""}
                  `}
                  >
                    {city.totalPercentage.toLocaleString("id-ID", {
                      maximumFractionDigits: 2,
                    })}
                    %
                  </TableCell>
                  {/* <TableCell
                    className={`p-4 text-center
                    ${index < 3 ? "font-bold" : ""}
                    ${index === 0 ? "text-yellow-500" : ""}
                    ${index === 1 ? "text-[#89939A]" : ""}
                    ${index === 2 ? "text-amber-700" : ""}
                  `}
                  >
                    {city.finalScore.toLocaleString("id-ID", {
                      maximumFractionDigits: 2,
                    })}
                  </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default OldRankingComponent;

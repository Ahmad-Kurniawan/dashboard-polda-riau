"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { City, Company } from "@/types";
import { riauCity } from "@/data/RiauCity";
import Image from "next/image";
import CompanyDetailsModal from "@/components/CompanyDetail";
import { Building2, Map, TargetIcon, Sprout } from "lucide-react";
import { Table, TableBody, TableRow } from "@/components/ui/table";
import OtherCompanyDetailsModal from "@/components/OtherCompanyDetail";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import NewRangking from "@/components/NewRangking";

const MapMarker = dynamic(() => import("@/components/MapMarker"), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] flex items-center justify-center bg-gray-100">
      <p className="text-black">Loading...</p>
    </div>
  ),
});

const MotionCard = motion(Card);

const DashboardRiauPage = () => {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [selectedOtherCompany, setSelectedOtherCompany] =
    useState<Company | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const tableRowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const getTotalStats = () => {
    return riauCity.reduce(
      (acc, polres) => ({
        totalArea: acc.totalArea + polres.totalArea,
        otherTotalArea: acc.otherTotalArea + polres.otherTotalArea,
        monokulturTarget: acc.monokulturTarget + polres.monokulturTarget,
        tumpangSariTarget: acc.tumpangSariTarget + polres.tumpangSariTarget,
        totalTarget: acc.totalTarget + polres.totalTarget,
      }),
      {
        totalArea: 0,
        otherTotalArea: 0,
        monokulturTarget: 0,
        tumpangSariTarget: 0,
        totalTarget: 0,
      }
    );
  };

  const getTotalAchievements = () => {
    return riauCity.reduce(
      (acc, polres) => {
        const allCompanies = [
          ...polres.companies,
          ...(polres.otherCompanies || []),
        ];

        const monoAchievement = allCompanies.reduce((sum, company) => {
          if (company.monokulturAchievements?.III) {
            return sum + company.monokulturAchievements.III;
          }
          return sum;
        }, 0);

        const tumpangSariAchievement = allCompanies.reduce((sum, company) => {
          if (company.tumpangSariAchievements?.III) {
            return sum + company.tumpangSariAchievements.III;
          }
          return sum;
        }, 0);

        const csrAchievement = allCompanies.reduce((sum, company) => {
          if (company.csrAchievements?.III) {
            return sum + company.csrAchievements.III;
          }
          return sum;
        }, 0);

        return {
          monokulturAchievement: acc.monokulturAchievement + monoAchievement,
          tumpangSariAchievement:
            acc.tumpangSariAchievement + tumpangSariAchievement,
          csrAchievement: acc.csrAchievement + csrAchievement,
        };
      },
      {
        monokulturAchievement: 0,
        tumpangSariAchievement: 0,
        csrAchievement: 0,
      }
    );
  };

  const handleCompanyClick = (company: Company) => {
    setSelectedCompany(company);
    setIsModalOpen(true);
  };

  const handleOtherCompanyClick = (company: Company) => {
    setSelectedOtherCompany(company);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCompany(null);
    setSelectedOtherCompany(null);
  };

  const stats = getTotalStats();
  const achievements = getTotalAchievements();

  return (
    <div className="bg-gradient-to-l from-emerald-50 to-emerald-200">
      <motion.div
        className="p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className=" p-6 rounded-xl bg-slate-50 shadow-lg"
          >
            <div className="flex items-start">
              <div className="relative h-16 w-16 mr-4 mt-1">
                <Image
                  src="/favicon.ico"
                  alt="Polda Riau Logo"
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold  bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700">
                  Dashboard Ketahanan Pangan Polda Riau
                </h1>
                <p className="text-gray-500 mt-1">
                  Overview Statistik dan Data Perusahaan Provinsi Riau
                </p>
              </div>
            </div>
          </motion.div>
          {/* Stats Summary */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {[
              {
                title: "Luas Keseluruhan",
                value: `${(
                  stats.totalArea + stats.otherTotalArea
                ).toLocaleString("id-ID", {
                  maximumFractionDigits: 2,
                })}`,
                description: "Total Lahan di Provinsi Riau",
                icon: Map,
                gradient: "from-purple-400 to-pink-500",
              },
              {
                title: "Monokultur",
                value: `${achievements.monokulturAchievement.toLocaleString(
                  "id-ID",
                  {
                    maximumFractionDigits: 2,
                  }
                )} dari ${stats.monokulturTarget.toLocaleString("id-ID", {
                  maximumFractionDigits: 2,
                })}`,
                description: "2% dari Total Lahan di Provinsi Riau",
                icon: Sprout,
                gradient: "from-sky-400 to-blue-500",
              },
              {
                title: "Tumpang Sari",
                value: `${achievements.tumpangSariAchievement.toLocaleString(
                  "id-ID",
                  {
                    maximumFractionDigits: 2,
                  }
                )} dari ${stats.tumpangSariTarget.toLocaleString("id-ID", {
                  maximumFractionDigits: 2,
                })}`,
                description: "7% dari Total Lahan di Provinsi Riau",
                icon: Sprout,
                gradient: "from-orange-400 to-pink-500",
              },
              {
                title: "Total Capaian",
                value: `${(
                  achievements.monokulturAchievement +
                  achievements.tumpangSariAchievement +
                  achievements.csrAchievement
                ).toLocaleString("id-ID", {
                  maximumFractionDigits: 2,
                })} dari ${(
                  stats.monokulturTarget + stats.tumpangSariTarget
                ).toLocaleString("id-ID", {
                  maximumFractionDigits: 2,
                })}`,
                description: "2% Monokultur + 7% Tumpang Sari + CSR",
                icon: TargetIcon,
                gradient: "from-green-400 to-emerald-500",
              },
            ].map((stat, index) => (
              <MotionCard
                key={index}
                variants={cardVariants}
                className={`bg-gradient-to-r ${stat.gradient} text-white border-none rounded-xl shadow-lg hover:shadow-xl transition-all`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <CardHeader className="flex flex-row items-center justify-between pb-4">
                  <CardTitle className="text-xl font-bold">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className="w-6 h-6 text-white opacity-80" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs opacity-80 mt-2">{stat.description}</p>
                </CardContent>
              </MotionCard>
            ))}
          </motion.div>
          {/* Map and Table Section */}
          <div className="col-span-12 lg:col-span-5">
            <div className="col-span-12 lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="rounded-xl shadow-lg hover:shadow-xl transition-all overflow-hidden border-none">
                  <CardHeader className="bg-blue-100">
                    <CardTitle className="flex items-center gap-2 text-xl text-blue-600">
                      <Map className="w-5 h-5 text-blue-600 hidden md:block" />
                      Peta Sebaran di Provinsi Riau
                    </CardTitle>
                    <CardDescription>
                      Pilih kab/kota untuk melihat daftar dan detail perusahaan
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <MapMarker
                      cities={riauCity}
                      onCityClick={setSelectedCity}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <NewRangking />
            </motion.div>
          </div>

          {/* Company Table */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="border-none rounded-xl shadow-lg hover:shadow-xl transition-all">
                <CardHeader className="rounded-t-xl bg-blue-100">
                  <CardTitle className="flex items-center text-lg gap-2 text-blue-600">
                    <Building2 className="w-5 h-5 hidden md:block" />
                    {selectedCity
                      ? `Perusahaan Target di ${selectedCity.nama}`
                      : "Daftar Perusahaan Target"}
                  </CardTitle>
                  {selectedCity ? (
                    <CardDescription>
                      Total {selectedCity.companies.length} perusahaan target.
                      Pilih perusahaan untuk melihat detail.
                    </CardDescription>
                  ) : (
                    <CardDescription>
                      Pilih kab/kota pada peta untuk melihat perusahaan target
                    </CardDescription>
                  )}
                </CardHeader>

                <CardContent className="p-0 overflow-y-auto max-h-[500px]">
                  {selectedCity ? (
                    <div className="p-4">
                      {selectedCity.companies.length > 0 ? (
                        <Table>
                          <TableBody>
                            {selectedCity.companies.map((company, index) => (
                              <TableRow
                                key={company.id}
                                className="border-b hover:bg-blue-50/50 cursor-pointer transition-colors"
                                onClick={() => handleCompanyClick(company)}
                              >
                                <motion.td
                                  variants={tableRowVariants}
                                  initial="hidden"
                                  animate="visible"
                                  transition={{ delay: index * 0.1 }}
                                  className="p-4 font-medium"
                                >
                                  {company.name}
                                </motion.td>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      ) : (
                        <motion.div
                          className="flex flex-col items-center justify-center py-16 text-gray-500"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Building2 className="w-12 h-12 mb-4 opacity-50" />
                          <p>Belum ada data perusahaan target...</p>
                        </motion.div>
                      )}
                    </div>
                  ) : (
                    <motion.div
                      className="flex flex-col items-center justify-center py-16 text-gray-500"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Map className="w-12 h-12 mb-4 opacity-50" />
                      <p>Pilih kab/kota pada peta...</p>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="border-none rounded-xl shadow-lg hover:shadow-xl transition-all">
                <CardHeader className="rounded-t-xl bg-blue-100">
                  <CardTitle className="flex items-center text-lg gap-2 text-blue-600">
                    <Map className="w-5 h-5 hidden md:block text-blue-600" />
                    {selectedCity
                      ? `Daftar Polsek di ${selectedCity.nama}`
                      : "Daftar Polsek"}
                  </CardTitle>
                  {selectedCity ? (
                    <CardDescription>
                      Total {selectedCity.policestations?.length || 0} polsek di wilayah
                      ini.
                    </CardDescription>
                  ) : (
                    <CardDescription>
                      Pilih kab/kota pada peta untuk melihat daftar polsek
                    </CardDescription>
                  )}
                </CardHeader>

                <CardContent className="p-0 overflow-y-auto max-h-[500px]">
                  {selectedCity ? (
                    <div className="p-4">
                      {selectedCity.policestations && selectedCity.policestations.length > 0 ? (
                        <Table>
                          <TableBody>
                            {selectedCity.policestations.map((polsek, index) => (
                              <TableRow
                                key={polsek.id}
                                className="border-b hover:bg-blue-50/50 transition-colors"
                              >
                                <motion.td
                                  variants={tableRowVariants}
                                  initial="hidden"
                                  animate="visible"
                                  transition={{ delay: index * 0.1 }}
                                  className="p-4 font-medium"
                                >
                                  {polsek.name}
                                </motion.td>
                                
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      ) : (
                        <motion.div
                          className="flex flex-col items-center justify-center py-16 text-gray-500"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Map className="w-12 h-12 mb-4 opacity-50" />
                          <p>Belum ada data Polsek...</p>
                        </motion.div>
                      )}
                    </div>
                  ) : (
                    <motion.div
                      className="flex flex-col items-center justify-center py-16 text-gray-500"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Map className="w-12 h-12 mb-4 opacity-50" />
                      <p>Pilih kab/kota pada peta...</p>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="border-none rounded-xl shadow-lg hover:shadow-xl transition-all">
                <CardHeader className="rounded-t-xl bg-blue-100">
                  <CardTitle className="flex items-center text-lg gap-2 text-blue-600">
                    <Building2 className="w-5 h-5 hidden md:block text-blue-600" />
                    {selectedCity
                      ? `Perusahaan Lain/Society/Poktan di ${selectedCity.nama}`
                      : "Daftar Perusahaan Lain/Society/Poktan"}
                  </CardTitle>
                  {selectedCity ? (
                    <CardDescription>
                      Total {selectedCity.otherCompanies?.length} perusahaan
                      lain. Pilih perusahaan untuk melihat detail.
                    </CardDescription>
                  ) : (
                    <CardDescription>
                      Pilih kab/kota pada peta untuk melihat perusahaan lain
                    </CardDescription>
                  )}
                </CardHeader>

                <CardContent className="p-0 overflow-y-auto max-h-[500px]">
                  {selectedCity ? (
                    <div className="p-4">
                      {selectedCity.otherCompanies &&
                      selectedCity.otherCompanies.length > 0 ? (
                        <Table>
                          <TableBody>
                            {selectedCity.otherCompanies.map(
                              (poktan, index) => (
                                <TableRow
                                  key={poktan.id}
                                  className="border-b hover:bg-blue-50/50 cursor-pointer transition-colors"
                                  onClick={() =>
                                    handleOtherCompanyClick(poktan)
                                  }
                                >
                                  <motion.td
                                    variants={tableRowVariants}
                                    initial="hidden"
                                    animate="visible"
                                    transition={{ delay: index * 0.1 }}
                                    className="p-4 font-medium"
                                  >
                                    {poktan.name}
                                  </motion.td>
                                </TableRow>
                              )
                            )}
                          </TableBody>
                        </Table>
                      ) : (
                        <motion.div
                          className="flex flex-col items-center justify-center py-16 text-gray-500"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Building2 className="w-12 h-12 mb-4 opacity-50" />
                          <p>
                            Belum ada data perusahaan lain/society/poktan...
                          </p>
                        </motion.div>
                      )}
                    </div>
                  ) : (
                    <motion.div
                      className="flex flex-col items-center justify-center py-16 text-gray-500"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Map className="w-12 h-12 mb-4 opacity-50" />
                      <p>Pilih kab/kota pada peta...</p>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
        {selectedCompany && (
          <CompanyDetailsModal
            company={selectedCompany}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
          />
        )}
        {selectedOtherCompany && (
          <OtherCompanyDetailsModal
            company={selectedOtherCompany}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
          />
        )}
      </motion.div>
    </div>
  );
};

export default DashboardRiauPage;
{
  /* <div className="grid grid-cols-12 gap-6">
  <div className="col-span-12 lg:col-span-7">
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Map className="w-5 h-5 text-blue-500" />
          Peta Sebaran Kota di Wilayah Riau
        </CardTitle>
        <CardDescription>
          Pilih wilayah untuk melihat list dan detail perusahaan
        </CardDescription>
      </CardHeader>
      <CardContent>
        <MapMarker cities={riauCity} onCityClick={setSelectedCity} />
        {selectedCity && <h2>Kota Terpilih: {selectedCity.nama}</h2>}
      </CardContent>
    </Card>
  </div>

  <div className="col-span-12 lg:col-span-5">
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="w-5 h-5 text-blue-500" />
          {selectedCity
            ? `Perusahaan di ${selectedCity.nama}`
            : "Daftar Perusahaan"}
        </CardTitle>
        {selectedCity && (
          <CardDescription>
            Total {selectedCity.companies.length} perusahaan. Pilih perusahaan
            untuk melihat detail.
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="overflow-y-auto max-h-[548px]">
        {selectedCity ? (
          <div>
            {selectedCity.companies.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama Perusahaan</TableHead>
                    <TableHead>Luas Lahan</TableHead>
                    <TableHead className="text-right">Target 2%</TableHead>
                    <TableHead className="text-right">Target 7%</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedCity.companies.map((company) => (
                    <TableRow
                      key={company.id}
                      className={`hover:bg-gray-50 cursor-pointer ${
                        selectedCompany?.id === company.id ? "bg-blue-50" : ""
                      }`}
                      onClick={() => handleCompanyClick(company)}
                    >
                      <TableCell className="font-medium">
                        {company.name}
                      </TableCell>
                      <TableCell>
                        {company.area.toLocaleString("id-ID", {
                          maximumFractionDigits: 2,
                        })}
                      </TableCell>
                      <TableCell className="text-right">
                        {company.target2Percent.toLocaleString("id-ID", {
                          maximumFractionDigits: 4,
                        })}
                      </TableCell>
                      <TableCell className="text-right">
                        {company.target7Percent.toLocaleString("id-ID", {
                          maximumFractionDigits: 4,
                        })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-gray-500">
                <Building2 className="w-12 h-12 mb-4 opacity-50" />
                <p>Belum ada data perusahaan...</p>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-gray-500">
            <Map className="w-12 h-12 mb-4 opacity-50" />
            <p>Pilih wilayah pada peta...</p>
          </div>
        )}
      </CardContent>
    </Card>
  </div>
</div>; */
}

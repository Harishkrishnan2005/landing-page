import ExcelJS from 'exceljs'

export const sendWorkbook = async (res, fileName, sheetName, rows) => {
  const workbook = new ExcelJS.Workbook()
  const sheet = workbook.addWorksheet(sheetName)

  sheet.addRow(['Export Timestamp', new Date().toISOString()])
  sheet.addRow([])

  if (rows.length) {
    const columns = Object.keys(rows[0]).map((key) => ({
      header: key,
      key,
      width: Math.max(
        key.length + 2,
        ...rows.map((row) => String(row[key] ?? '').length + 2),
      ),
    }))

    sheet.columns = columns
    rows.forEach((row) => sheet.addRow(row))
    sheet.getRow(3).font = { bold: true }
  }

  res.setHeader(
    'Content-Disposition',
    `attachment; filename="${fileName}-${Date.now()}.xlsx"`,
  )
  res.type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  await workbook.xlsx.write(res)
  res.end()
}

function DataTableToolbar({
  search,
  onSearchChange,
  searchPlaceholder,
  filters,
  action,
}) {
  return (
    <div className="flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-white/5 p-4 backdrop-blur sm:p-5 lg:flex-row lg:items-center lg:justify-between">
      <div className="grid flex-1 gap-3 md:grid-cols-3">
        <input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={searchPlaceholder}
          className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm outline-none ring-0 placeholder:text-slate-500 focus:border-amber-300"
        />
        {filters}
      </div>
      {action ? <div className="w-full lg:w-auto">{action}</div> : null}
    </div>
  )
}

export default DataTableToolbar

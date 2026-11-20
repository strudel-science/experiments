import { useEffect, useState } from 'react';
import {
  Binary,
  Code2,
  Copy,
  Database,
  Dna,
  Download,
  Filter,
  FlaskConical,
  Gauge,
  Layers,
  Moon,
  Sparkles,
  Sun,
  TableProperties,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';
import {
  ChemicalFormula,
  LinearMeter,
  LabelValueTable,
  LinkCard,
  CellWithPopover,
  ArrayWithPopover,
  ClickToCopy,
  FilterChips,
  PageHeader,
  type FilterChipItem,
} from '@/components/kit';
import { formatFileSize, formatQuantity, formatCompactNumber, downloadFile } from '@/utils';

const initialFilters: FilterChipItem[] = [
  { id: 'biome-soil', category: 'Biome', label: 'Permafrost Active Layer' },
  { id: 'seq-meta', category: 'Sequencing', label: 'Illumina NovaSeq Metagenome' },
  { id: 'loc-alaska', category: 'Location', label: 'Utqiaġvik, AK' },
  { id: 'depth-deep', category: 'Depth', label: '0.2 - 0.5 m' },
  { id: 'curation-pass', category: 'Curation', label: 'GOLD Curated' },
];

export const App = () => {
  const [isDark, setIsDark] = useState(false);
  const [meterVal, setMeterVal] = useState(72);
  const [formulaInput, setFormulaInput] = useState('Ca10(PO4)6(OH)2');
  const [activeFilters, setActiveFilters] = useState<FilterChipItem[]>(initialFilters);
  const [fileSizeBytes, setFileSizeBytes] = useState(104857600);
  const [useBinaryPrefix, setUseBinaryPrefix] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handleRemoveFilter = (filter: FilterChipItem) => {
    setActiveFilters((prev) => prev.filter((f) => f.id !== filter.id));
  };

  const handleClearFilters = () => {
    setActiveFilters([]);
  };

  const handleResetFilters = () => {
    setActiveFilters(initialFilters);
  };

  const handleDownloadSample = () => {
    const sampleData = {
      id: 'nmdc:bsm-11-ay2145902148194018240-east-river-permafrost',
      ecosystem: 'Permafrost active layer',
      elevation_m: 3120,
      chemical_constituents: ['Ca10(PO4)6(OH)2', 'Fe2O3·H2O'],
      exported_at: new Date().toISOString(),
    };
    downloadFile(JSON.stringify(sampleData, null, 2), 'sample_metadata.json', 'application/json');
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background text-foreground transition-colors">
        {/* Top Navigation Bar */}
        <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur px-6 py-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-9 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold shadow-sm">
                <FlaskConical className="size-5" />
              </div>
              <div>
                <h1 className="text-lg font-bold leading-none tracking-tight">Mega Components Library</h1>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Reusable scientific frontend components for research applications
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="font-mono text-xs">
                v0.2.0-beta
              </Badge>
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button
                      variant="outline"
                      size="icon-sm"
                      onClick={() => setIsDark(!isDark)}
                      aria-label="Toggle theme"
                    >
                      {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
                    </Button>
                  }
                />
                <TooltipContent>Toggle {isDark ? 'Light' : 'Dark'} Mode</TooltipContent>
              </Tooltip>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto p-6 md:p-8 space-y-12">
          {/* Section: PageHeader */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <Layers className="size-5 text-primary" />
              <h2 className="text-xl font-semibold tracking-tight">PageHeader</h2>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Hierarchical Landmark & Detail View Header</CardTitle>
                <CardDescription>
                  Semantic header featuring breadcrumb trails, entity status badges, descriptive abstracts, and action
                  slots.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PageHeader
                  title="East River Watershed Microbial Observatory"
                  badge={<Badge variant="secondary">QC Passed</Badge>}
                  breadcrumbs={[
                    { label: 'Portals', href: '#' },
                    { label: 'Biosamples', href: '#' },
                    { label: 'ER-WTR-2026-04', current: true },
                  ]}
                  description="High-throughput biogeochemical and metagenomic sequencing of soil cores collected along East River, Colorado."
                  actions={
                    <div className="flex flex-wrap items-center gap-2">
                      <Button variant="outline" size="sm" onClick={handleDownloadSample}>
                        <Download className="size-3.5 mr-1.5" />
                        Export JSON
                      </Button>
                      <ClickToCopy text="nmdc:bsm-11-er-2026-wtr" variant="secondary" size="sm">
                        Copy ID
                      </ClickToCopy>
                    </div>
                  }
                  metadata={
                    <>
                      <span>DOI: 10.25585/1488214</span>
                      <span>•</span>
                      <span>Biome: Freshwater Wetland</span>
                      <span>•</span>
                      <span>Last Synced: 2026-10-07</span>
                    </>
                  }
                />
              </CardContent>
            </Card>
          </section>

          {/* Section: FilterChips */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <Filter className="size-5 text-primary" />
              <h2 className="text-xl font-semibold tracking-tight">FilterChips</h2>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Active Search Facets & Applied Filters</CardTitle>
                <CardDescription>
                  Dismissible facet tags with category prefixes, "+N more" overflow collapse, and batch reset support.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-muted/40 rounded-lg border border-border min-h-[56px] flex items-center justify-between">
                  {activeFilters.length > 0 ? (
                    <FilterChips
                      label="Active Facets:"
                      filters={activeFilters}
                      onRemove={handleRemoveFilter}
                      onClearAll={handleClearFilters}
                      maxVisible={3}
                    />
                  ) : (
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs text-muted-foreground italic">No filters currently active.</span>
                      <Button variant="outline" size="xs" onClick={handleResetFilters}>
                        Reset Demo Filters
                      </Button>
                    </div>
                  )}
                </div>
                {activeFilters.length > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Try removing individual chips using the (x) button or click Clear all.
                  </p>
                )}
              </CardContent>
            </Card>
          </section>

          {/* Section: CellWithPopover & ArrayWithPopover */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <TableProperties className="size-5 text-primary" />
              <h2 className="text-xl font-semibold tracking-tight">CellWithPopover & ArrayWithPopover</h2>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Data Grid Cell Overflow Enhancements</CardTitle>
                <CardDescription>
                  Gracefully truncates long strings and multi-value lists while providing popover previews on hover or
                  click.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border border-border rounded-lg overflow-x-auto">
                  <table className="w-full text-sm text-left border-collapse">
                    <thead className="bg-muted/60 text-xs uppercase font-semibold text-muted-foreground border-b border-border">
                      <tr>
                        <th className="p-3">Sample Identifier (CellWithPopover)</th>
                        <th className="p-3">Ecosystem Description (CellWithPopover)</th>
                        <th className="p-3">Ontology Tags (ArrayWithPopover)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr className="hover:bg-muted/20">
                        <td className="p-3 font-mono text-xs">
                          <CellWithPopover maxWidth="180px">
                            nmdc:bsm-11-ay2145902148194018240-east-river-permafrost-core
                          </CellWithPopover>
                        </td>
                        <td className="p-3 text-xs">
                          <CellWithPopover maxWidth="240px" side="top">
                            Permafrost thaw gradient with elevated dissolved organic carbon, methane emission fluxes,
                            and cryogenic mineral weathering.
                          </CellWithPopover>
                        </td>
                        <td className="p-3">
                          <ArrayWithPopover
                            values={[
                              'ENVO:00000134',
                              'ENVO:01000253',
                              'ENVO:00002169',
                              'GOLD:Ecosystem',
                              'Biome:Tundra',
                              'Cryosol',
                            ]}
                            maxVisible={2}
                          />
                        </td>
                      </tr>
                      <tr className="hover:bg-muted/20">
                        <td className="p-3 font-mono text-xs">
                          <CellWithPopover maxWidth="180px">
                            mp-1029348-sr2feo4-perovskite-superconductor
                          </CellWithPopover>
                        </td>
                        <td className="p-3 text-xs">
                          <CellWithPopover maxWidth="240px" side="top">
                            Strontium iron oxide layered perovskite with non-collinear magnetic ordering calculated
                            under GGA+U functional.
                          </CellWithPopover>
                        </td>
                        <td className="p-3">
                          <ArrayWithPopover
                            values={['Oxide', 'Perovskite', 'Ferromagnetic', 'Calculated', 'PBE+U']}
                            maxVisible={2}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section: ClickToCopy */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <Copy className="size-5 text-primary" />
              <h2 className="text-xl font-semibold tracking-tight">ClickToCopy</h2>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>One-Click Persistent Identifier & Command Copying</CardTitle>
                <CardDescription>
                  Accessible clipboard helper with animated check transitions and configurable tooltip feedback.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 rounded-lg border border-border bg-muted/30 space-y-2">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                      DOI Citation Copy
                    </span>
                    <div className="flex items-center gap-2">
                      <ClickToCopy
                        text="10.1038/s41586-023-06283-x"
                        variant="outline"
                        label="Copy DOI"
                        copiedLabel="DOI Copied!"
                      >
                        10.1038/s41586-023-06283-x
                      </ClickToCopy>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border border-border bg-muted/30 space-y-2">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                      Accession PID (Icon Only)
                    </span>
                    <div className="flex items-center gap-2">
                      <code className="text-xs font-mono bg-background px-2 py-1 rounded border border-border">
                        GOLD:Gb0123456
                      </code>
                      <ClickToCopy
                        text="GOLD:Gb0123456"
                        variant="ghost"
                        label="Copy Accession"
                        copiedLabel="Accession Copied!"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg border border-border bg-muted/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2 overflow-x-auto font-mono text-xs">
                    <Code2 className="size-4 text-muted-foreground shrink-0" />
                    <span>curl -s https://api.microbiomedata.org/biosamples/SMP-1024 | jq</span>
                  </div>
                  <ClickToCopy
                    text="curl -s https://api.microbiomedata.org/biosamples/SMP-1024 | jq"
                    variant="secondary"
                    size="xs"
                    label="Copy CLI Command"
                    copiedLabel="Command Copied!"
                  >
                    Copy Command
                  </ClickToCopy>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section: Scientific Utilities */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="size-5 text-primary" />
              <h2 className="text-xl font-semibold tracking-tight">Scientific Utilities</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {/* formatFileSize Demo */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Binary className="size-4 text-primary" />
                    formatFileSize
                  </CardTitle>
                  <CardDescription>
                    Decimal SI (1000) or IEC binary (`binaryPrefix: true`, 1024) file size formatting.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Input Bytes:</span>
                    <span className="font-mono text-xs">{fileSizeBytes.toLocaleString()} B</span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="107374182400"
                    step="1000000"
                    value={fileSizeBytes}
                    onChange={(e) => setFileSizeBytes(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <label className="text-xs flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={useBinaryPrefix}
                        onChange={(e) => setUseBinaryPrefix(e.target.checked)}
                        className="rounded"
                      />
                      Use binary prefix (KiB, MiB, GiB)
                    </label>
                    <Badge variant="default" className="text-sm font-mono">
                      {formatFileSize(fileSizeBytes, { binaryPrefix: useBinaryPrefix, precision: 2 })}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* formatQuantity & formatCompactNumber */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Gauge className="size-4 text-primary" />
                    formatQuantity & formatCompactNumber
                  </CardTitle>
                  <CardDescription>LinkML QuantityValue formatting and compact metric abbreviation.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-2.5 rounded bg-muted/40 border border-border flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Quantity Interval:</span>
                    <span className="font-mono font-medium">
                      {formatQuantity({
                        has_minimum_numeric_value: 12.4,
                        has_maximum_numeric_value: 18.9,
                        has_unit: 'mg/L',
                      })}
                    </span>
                  </div>
                  <div className="p-2.5 rounded bg-muted/40 border border-border flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Bounded Bound:</span>
                    <span className="font-mono font-medium">
                      {formatQuantity({ has_maximum_numeric_value: 0.05, has_unit: 'ppm' })}
                    </span>
                  </div>
                  <div className="p-2.5 rounded bg-muted/40 border border-border flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Compact Count (1,450,200 reads):</span>
                    <span className="font-mono font-medium">{formatCompactNumber(1450200, { suffix: ' reads' })}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Section: Chemical Formula */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <Dna className="size-5 text-primary" />
              <h2 className="text-xl font-semibold tracking-tight">ChemicalFormula</h2>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Automatic Subscript Formatting</CardTitle>
                <CardDescription>
                  Accurately renders complex stoichiometric formulas, hydrates, and ions without requiring manual
                  markup.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-wrap items-center gap-6">
                  <div className="p-3 bg-muted rounded-lg border border-border">
                    <span className="text-xs font-mono text-muted-foreground block mb-1">Water</span>
                    <ChemicalFormula content="H2O" className="text-xl font-bold" />
                  </div>
                  <div className="p-3 bg-muted rounded-lg border border-border">
                    <span className="text-xs font-mono text-muted-foreground block mb-1">Iron(III) Sulfate</span>
                    <ChemicalFormula content="Fe2(SO4)3" className="text-xl font-bold" />
                  </div>
                  <div className="p-3 bg-muted rounded-lg border border-border">
                    <span className="text-xs font-mono text-muted-foreground block mb-1">Copper Hydrate</span>
                    <ChemicalFormula content="CuSO4·5H2O" className="text-xl font-bold" />
                  </div>
                  <div className="p-3 bg-muted rounded-lg border border-border">
                    <span className="text-xs font-mono text-muted-foreground block mb-1">Glucose</span>
                    <ChemicalFormula content="C6H12O6" className="text-xl font-bold" />
                  </div>
                </div>
                <div className="pt-4 border-t border-border flex items-center gap-3">
                  <label htmlFor="formula-test" className="text-sm font-medium">
                    Try custom formula:
                  </label>
                  <input
                    id="formula-test"
                    type="text"
                    value={formulaInput}
                    onChange={(e) => setFormulaInput(e.target.value)}
                    className="h-8 px-3 rounded-md border border-input bg-background font-mono text-sm max-w-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="Enter formula (e.g. KMnO4)"
                  />
                  <div className="px-3 py-1 bg-muted rounded-md border border-border">
                    <ChemicalFormula content={formulaInput} className="text-base font-semibold" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section: LinearMeter */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <Gauge className="size-5 text-primary" />
              <h2 className="text-xl font-semibold tracking-tight">LinearMeter</h2>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Horizontal One-Dimensional Metrics</CardTitle>
                <CardDescription>
                  Accessible progress and threshold visualizer with customizable variants and ARIA meter attributes.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Interactive Meter ({meterVal}%)</label>
                    <LinearMeter value={meterVal} showValue variant="default" />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={meterVal}
                      onChange={(e) => setMeterVal(Number(e.target.value))}
                      className="w-full mt-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Success Status (Cluster Health)</label>
                    <LinearMeter value={94} showValue variant="success" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Warning Threshold (Memory Usage)</label>
                    <LinearMeter value={81} showValue variant="warning" formatValue={(val) => `${val} GB / 100 GB`} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Destructive Alert (Thermal Load)</label>
                    <LinearMeter value={97} showValue variant="destructive" size="lg" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section: LabelValueTable */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <Database className="size-5 text-primary" />
              <h2 className="text-xl font-semibold tracking-tight">LabelValueTable</h2>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Scientific Metadata & Entity Attributes</CardTitle>
                <CardDescription>
                  Two-column semantic layout optimized for sample metadata, experiment parameters, and instrument
                  telemetry.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LabelValueTable
                  rows={[
                    {
                      label: 'Biosample ID',
                      value: 'SMP-EAST-RIVER-2026',
                      description: 'Persistent identifier',
                    },
                    {
                      label: 'Sample Composition',
                      value: <ChemicalFormula content="Fe2O3·H2O" className="font-semibold" />,
                    },
                    {
                      label: 'Geographic Origin',
                      value: 'Gothic, Colorado (38.9585° N, 106.9894° W)',
                    },
                    {
                      label: 'Sequencing Quality (Q30)',
                      value: '96.4%',
                    },
                    {
                      label: 'Pipeline Status',
                      value: <Badge variant="outline">QC Passed</Badge>,
                    },
                  ]}
                  labelWidth="200px"
                  bordered
                />
              </CardContent>
            </Card>
          </section>

          {/* Section: LinkCard */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <FlaskConical className="size-5 text-primary" />
              <h2 className="text-xl font-semibold tracking-tight">LinkCard</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <LinkCard
                title="Microbiome Data Portal"
                description="Access standard microbiome multi-omics data products from diverse environmental ecosystems."
                href="https://data.microbiomedata.org"
                target="_blank"
                badge="NMDC"
                icon={<Database className="size-5" />}
              />
              <LinkCard
                title="Materials Project"
                description="Explore density functional calculations, phase diagrams, and elastic tensors for known inorganic materials."
                href="https://next-gen.materialsproject.org"
                target="_blank"
                badge="MP"
                icon={<FlaskConical className="size-5" />}
              />
              <LinkCard
                title="STRUDEL Kit"
                description="Design system and task-flow patterns for scientific software interfaces and research computing."
                href="https://strudel.science"
                target="_blank"
                badge="Design System"
                icon={<Dna className="size-5" />}
              />
            </div>
          </section>
        </main>
      </div>
    </TooltipProvider>
  );
};

export default App;

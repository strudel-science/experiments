import { useEffect, useState } from 'react';
import { Database, Dna, FlaskConical, Gauge, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';
import { ChemicalFormula } from '@/components/kit/ChemicalFormula';
import { LinearMeter } from '@/components/kit/LinearMeter';
import { LabelValueTable } from '@/components/kit/LabelValueTable';
import { LinkCard } from '@/components/kit/LinkCard';

export function App() {
  const [isDark, setIsDark] = useState(false);
  const [meterVal, setMeterVal] = useState(72);
  const [formulaInput, setFormulaInput] = useState('Ca10(PO4)6(OH)2');

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background text-foreground transition-colors">
        {/* Header */}
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
                v0.1.0-alpha
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
        <main className="max-w-6xl mx-auto p-6 md:p-8 space-y-10">
          {/* Intro Section */}
          <section className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">Scientific UI Components</h2>
            <p className="text-muted-foreground max-w-3xl leading-relaxed">
              Standardized components designed for data portals, high-performance computing, and laboratory workflows.
              Built with modern React, Base UI primitives, and Tailwind styling.
            </p>
          </section>
          {/* Section 1: Chemical Formula */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <Dna className="size-5 text-primary" />
              <h3 className="text-xl font-semibold tracking-tight">ChemicalFormula</h3>
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
          {/* Section 2: LinearMeter */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <Gauge className="size-5 text-primary" />
              <h3 className="text-xl font-semibold tracking-tight">LinearMeter</h3>
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
          {/* Section 3: LabelValueTable */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <Database className="size-5 text-primary" />
              <h3 className="text-xl font-semibold tracking-tight">LabelValueTable</h3>
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
                  striped
                />
              </CardContent>
            </Card>
          </section>
          {/* Section 4: LinkCard */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <FlaskConical className="size-5 text-primary" />
              <h3 className="text-xl font-semibold tracking-tight">LinkCard</h3>
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
}

export default App;

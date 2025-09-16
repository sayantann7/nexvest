// Fetch-based data loader (no filesystem usage).
// Assumes JSON files are served from public folder at
// /mutual-fund-data/<Folder Name>/data.json
// Fund house names are mapped here; extend as you add more folders.

export interface FundHouseDirectory {
  name: string;            // Display name (folder name on disk)
  folder: string;          // Exact folder name as in public
  slug: string;            // URL slug
  path: string;            // Public fetch path
}

// Types aligned with mutual-fund-data-structure.md
export interface BasicInfo { fund_name: string; category: string; risk_level: string; plan_type: string; scheme_type: string; inception_date: string; benchmark: string; benchmark_name: string; fund_size: number; fund_manager: string; registrar_agent: string; face_value: number | null; nfo_risk: string; }
export interface NavInfo { current_nav: number; nav_date: string; }
export interface ReturnsAbsolute { '1d': number; '1w': number; '1m': number; '3m': number; '6m': number; '1y': number; '3y': number; '5y': number; '10y': number; }
export interface ReturnsCagr { '3y': number; '5y': number; '10y': number; since_inception: number; }
export interface ReturnsCategory { '3m': number; '6m': number; '1y': number; '3y': number; '5y': number; }
export interface ReturnsIndex { '1y': number | null; '3y': number | null; '5y': number | null; }
export interface RiskMetrics { alpha: number; beta: number; sharpe_ratio: number; sortino_ratio: number; standard_deviation: number; risk_rating: number; }
export interface Returns { absolute: Partial<ReturnsAbsolute>; cagr: Partial<ReturnsCagr>; category_returns: Partial<ReturnsCategory>; index_returns: Partial<ReturnsIndex>; risk_metrics: Partial<RiskMetrics>; }
export interface ExpenseHistoryEntry { ratio: number; date: string; turnover_ratio: number | null; }
export interface ExpenseRatio { current: number; history: ExpenseHistoryEntry[]; }
export interface ExitLoadEntry { description: string | null; as_on_date: string; }
export interface InvestmentInfo { minimum_sip: number; maximum_sip: number; minimum_lumpsum: number; maximum_lumpsum: number | null; stamp_duty: string; sip_multiplier: number; mini_additional_investment: number; }
export interface FundHouseInfo { name: string; amc_code: string | null; rta_name: string; custodian: string; address: string; email: string; website: string; }
export interface AnalysisEntry { scheme_code: string; analysis_type: string; analysis_subject: string; analysis_desc: string; analysis_data: string; rating: number | null; }
export interface AdditionalInfo { isin: string; fund_type: string | null; sid_url: string; is_closed_ended: boolean; closure_date: string | null; crisil_rating: string | null; rta_scheme_code: string; super_category: string; sub_category: string; description: string; analysis: AnalysisEntry[]; }
export interface Holding { company_name: string; nature_name: string; sector_name: string | null; instrument_name: string; market_value: number; corpus_percentage: number; }
export interface SchemeRecord { basic_info: BasicInfo; nav_info: NavInfo; returns: Returns; expense_ratio: ExpenseRatio; exit_load: ExitLoadEntry[]; investment_info: InvestmentInfo; fund_house: FundHouseInfo; additional_info: AdditionalInfo; holdings: Holding[]; }

export interface FundHouse { name: string; slug: string; filePath: string; schemes: SchemeRecord[]; }

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/--+/g, '-');
}

// Static map of known fund house folders (extend as needed)
export const FUND_HOUSE_FOLDERS: FundHouseDirectory[] = [
  {
    name: 'Aditya Birla Sun Life Mutual Fund',
    folder: 'Aditya Birla Sun Life Mutual Fund',
    slug: slugify('Aditya Birla Sun Life Mutual Fund'),
    path: '/mutual-fund-data/Aditya-Birla-Sun-Life-Mutual-Fund/data.json'
  },
  {
    name: 'Axis Mutual Fund',
    folder: 'Axis Mutual Fund',
    slug: slugify('Axis Mutual Fund'),
    path: '/mutual-fund-data/Axis-Mutual-Fund/data.json'
  },
  {
    name: 'Bandhan Mutual Fund',
    folder: 'Bandhan Mutual Fund',
    slug: slugify('Bandhan Mutual Fund'),
    path: '/mutual-fund-data/Bandhan-Mutual-Fund/data.json'
  },
  {
    name: 'DSP Mutual Fund',
    folder: 'DSP Mutual Fund',
    slug: slugify('DSP Mutual Fund'),
    path: '/mutual-fund-data/DSP-Mutual-Fund/data.json'
  },
  {
    name: 'Franklin Templinton Mutual Fund',
    folder: 'Franklin Templinton Mutual Fund',
    slug: slugify('Franklin Templinton Mutual Fund'),
    path: '/mutual-fund-data/Franklin-Templinton-Mutual-Fund/data.json'
  },
];

export async function fetchFundHouseData(dir: FundHouseDirectory): Promise<FundHouse | null> {
  try {
    // In a server context, global fetch in Node requires absolute URLs.
    // Build one using NEXT_PUBLIC_SITE_ORIGIN or fallback to http://localhost:3000.
    const isRelative = dir.path.startsWith('/');
    const origin = process.env.NEXT_PUBLIC_SITE_ORIGIN || process.env.SITE_ORIGIN || 'http://localhost:3000';
    const url = isRelative ? origin.replace(/\/$/, '') + dir.path : dir.path;
    const res = await fetch(url, { cache: 'force-cache' });
    if(!res.ok) return null;
    const data: SchemeRecord[] = await res.json();
    return { name: dir.name, slug: dir.slug, filePath: dir.path, schemes: data };
  } catch (e) {
    console.error('Failed to fetch fund house', dir.name, e);
    return null;
  }
}

export async function loadAllFundHouses(): Promise<FundHouse[]> {
  const results = await Promise.all(FUND_HOUSE_FOLDERS.map(fetchFundHouseData));
  return results.filter(Boolean) as FundHouse[];
}

export async function findFundHouseBySlug(slug: string): Promise<FundHouse | null> {
  const target = FUND_HOUSE_FOLDERS.find(f => f.slug === slug);
  if(!target) return null;
  return fetchFundHouseData(target);
}

export function findSchemeBySlugSync(house: FundHouse, schemeSlug: string): SchemeRecord | null {
  return house.schemes.find(s => slugify(s.basic_info.fund_name) === schemeSlug) || null;
}

export async function findSchemeBySlug(houseSlug: string, schemeSlug: string): Promise<{ house: FundHouse; scheme: SchemeRecord } | null> {
  const house = await findFundHouseBySlug(houseSlug);
  if(!house) return null;
  const scheme = findSchemeBySlugSync(house, schemeSlug);
  if(!scheme) return null;
  return { house, scheme };
}

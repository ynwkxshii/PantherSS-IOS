// ╔═══════════════════════════════════════════════════════════╗
// ║           PANTHER SS — iOS Privacy Scanner               ║
// ║         Anti-Cheat · Free Fire · Panther Apostas         ║
// ╚═══════════════════════════════════════════════════════════╝

const DEVICE_LANG = (Device.language() || "pt").toLowerCase().substring(0, 2)
const SPEECH = {
  pt: {
    start:    "Analisando, aguarde o PantherSS terminar.",
    half:     "Scanner em cinquenta por cento. Aguarde mais um pouco.",
    probe:    "Scanner em noventa por cento. Quase lá.",
    done:     "PantherSS finalizado. Analise os resultados com cuidado.",
  },
  en: {
    start:    "Analyzing, please wait for PantherSS to finish.",
    half:     "Scanner at fifty percent. Please wait a little longer.",
    probe:    "Scanner at ninety percent. Almost done.",
    done:     "PantherSS finished. Analyze the results carefully.",
  },
  es: {
    start:    "Analizando, espera que PantherSS termine.",
    half:     "Escáner al cincuenta por ciento. Espera un poco más.",
    probe:    "Escáner al noventa por ciento. Ya casi termina.",
    done:     "PantherSS finalizado. Analiza los resultados con cuidado.",
  },
}
const S = SPEECH[DEVICE_LANG] || SPEECH["pt"]

// ─── INFRAESTRUTURA DE HOSTING / VPS ────────────────────────────────────────

const VPS_HOSTING_KEYWORDS = [
  "hostinger","hstgr","locaweb","kinghost","umbler","hostgator",
  "uol host","uolhost","bol","bol.com.br","redehost","weblink",
  "brasileirohost","br.host","dialhost","serverspace","melhorhospedagem",
  "ibrcom","masterweb","superdomínios","superdomin","plankton","vps.br",
  "digitalocean","linode","akamai","vultr","hetzner","ovh","ovhcloud",
  "contabo","ionos","godaddy","siteground","cloudways",
  "amazon","aws","amazonaws","google cloud","googlecloud",
  "microsoft azure","azure","alibaba cloud","alibabacloud",
  "tencent cloud","tencentcloud","hstgr.cloud","srv.umbler",
  "kinghost.net","locaweb.com.br","choopa","psychz","m247",
  "serverius","frantech","buyvm","sharktech","quadranet","nexeon",
  "servermania","hostwinds","racknerd","dedipath","spartanhost","cloudie",
  "tsohost","wavenet","fasthosts","multacom","telus",
  "fdcservers","fdc servers","leaseweb","colocation america",
  "b2 net","b2net","path.net","datacamp","tzulo","coresite",
]

const CHEAT_PROXY_ASN = {
  "AS35916": "Multacom Corporation (cheat proxy LA)",
  "AS47583": "Hostinger International (cheat proxy BR)",
  "AS60781": "LeaseWeb Netherlands",
  "AS28753": "LeaseWeb Deutschland",
  "AS16276": "OVH SAS",
  "AS14061": "DigitalOcean",
  "AS20473": "Choopa / Vultr",
  "AS8100":  "QuadraNet",
  "AS40065": "Cnservers / FDC Servers",
  "AS53667": "FranTech Solutions",
  "AS395954":"Leaseweb USA",
  "AS13335": "Cloudflare (CDN/Proxy — comum em cheats)",
  "AS209":   "CenturyLink / Lumen",
  "AS7203":  "Sharktech",
}

const RDNS_HOSTING_PATTERNS = [
  "hstgr.cloud","staticip","srv.","vps.","cloud.","host.",
  "server.","dedicated.",".kinghost.net",".locaweb.com.br",
  ".umbler.net",".hostgator.com.br",".digitalocean.com",
  ".vultr.com",".linode.com",".hetzner.com",".contabo.net",
]

// ─── APPS DE CHEAT / PROXY / JAILBREAK ─────────────────────────────────────

const CHEAT_APPS = {
  "com.touchingapp.potatsolite":      "PotatsoLite — proxy iOS (mitmproxy cheat)",
  "com.touchingapp.potatso":          "Potatso — proxy iOS",
  "com.monite.proxyff":               "ProxyFF — proxy iOS (cheat confirmado)",
  "com.nssurge.inc.surge-ios":        "Surge — proxy/MITM iOS",
  "com.luo.quantumultx":              "Quantumult X — proxy iOS",
  "group.com.luo.quantumult":         "Quantumult — proxy iOS",
  "com.shadowrocket.Shadowrocket":    "Shadowrocket — proxy iOS",
  "com.liguangming.Shadowrocket":     "Shadowrocket (alt) — proxy iOS",
  "com.github.shadowsocks":           "Shadowsocks",
  "com.netease.trojan":               "Trojan proxy",
  "com.hiddify.app":                  "Hiddify — proxy",
  "com.karing.app":                   "Karing — proxy",
  "com.metacubex.ClashX":             "ClashX — proxy",
  "com.ssrss.Ssrss":                  "SSR iOS proxy",
  "com.adguard.ios.AdguardPro":       "AdGuard Pro (proxy MITM)",
  "com.privateinternetaccess.ios":    "PIA VPN",
  "com.anonymousiphone.detoxme":      "Detox — proxy iOS",
  "com.futureland.vpnmaster":         "VPN Master",
  "com.cloudflare.1dot1dot1dot1":     "Cloudflare 1.1.1.1 (WARP proxy)",
  "com.opa334.dopamine":              "Dopamine — Jailbreak",
  "org.coolstar.sileo":               "Sileo — package manager JB",
  "org.coolstar.odyssey":             "Odyssey — Jailbreak",
  "com.electrateam.unc0ver":          "unc0ver — Jailbreak",
  "com.tihmstar.checkra1n":           "checkra1n — Jailbreak",
  "org.taurine.jailbreak":            "Taurine — Jailbreak",
  "xyz.palera1n.palera1n":            "palera1n — Jailbreak",
  "com.opa334.TrollStore":            "TrollStore — sideload sem JB",
  "com.opa334.TrollStoreHelper":      "TrollStoreHelper",
  "com.opa334.trolldecrypt":          "TrollDecrypt — decifrar IPAs",
  "com.opa334.trollfools":            "TrollFools — injetor de tweaks",
  "xyz.willy.Zebra":                  "Zebra — package manager JB",
  "com.cydia.Cydia":                  "Cydia — package manager JB",
  "com.rileytestut.AltStore":         "AltStore — sideload",
  "com.altstore.altstoreclassic":     "AltStore Classic — sideload",
  "com.sideloadly.sideloadly":        "Sideloadly — sideload",
  "com.esign.ios":                    "ESign — sideload/IPA installer",
  "com.esign.esign":                  "ESign (alt) — sideload",
  "com.iosgods.iosgods":              "iOSGods — cheat app store",
  "com.gbox.pubg":                    "GBox — cheat mod pubg/ff",
  "com.tigisoftware.Filza":           "Filza — file manager root",
  "com.tigisoftware.FilzaFree":       "Filza Free — file manager root",
  "app.ish.iSH":                      "iSH — shell Linux no iOS",
  "com.septudio.SSHClientLite":       "SSH Client Lite — shell remoto",
  "live.cclerc.geranium":             "Geranium — tweak manager JB",
  "com.apple.dt.Xcode":               "Xcode — IDE Apple (suspeito em contexto de jogo)",
  "com.apple.Preferences.Developer":  "Preferências de Desenvolvedor (ativas)",
  "com.apple.developer":              "Perfil de desenvolvedor Apple",
  "com.shpion.cleaner":               "Spion Cleaner — limpeza de rastros suspeita",
  "com.ifunbox.ifunbox":              "iFunBox — gerenciador de arquivos iOS",
  "com.limneos.adprivacy":            "AdPrivacy — bloqueio/manipulação de rede",
  "com.jjcm.nomoread":                "NoMoreAd — bloqueio de rede (MITM possível)",
  // NOVOS — adicionados pelo PantherSS
  "com.limeVPN.LimeVPN":              "LimeVPN — proxy/VPN",
  "com.Nord.VPN":                     "NordVPN",
  "com.expressvpn.ExpressVPN":        "ExpressVPN",
  "com.surfshark.vpnclient.ios":      "Surfshark VPN",
  "com.protonvpn.ios":                "ProtonVPN",
  "com.windscribe.vpn":               "Windscribe VPN",
  "com.getlantern.lantern":           "Lantern — proxy/bypass",
  "com.psiphon3.PsiphonForIOS":       "Psiphon — proxy bypass",
  "com.v2box.ios":                    "V2Box — proxy v2ray iOS",
  "com.streisand.Streisand":          "Streisand — proxy iOS",
  "com.celeritasdesign.GoodVPN":      "GoodVPN",
  "com.openVPN.OpenVPN-Connect":      "OpenVPN Connect",
}

const SUSPICIOUS_TLDS = [
  ".site",".store",".netlify.app",".netlify",".xyz",".pw",
  ".top",".click",".bid",".win",".stream",".download",
  ".icu",".gq",".cf",".ml",".ga",".tk",
  ".monster",".fun",".rest",".bar",".lol",
]

const SUSPICIOUS_DOMAIN_WORDS = [
  "proxy","cheat","hack","bypass","mitm","inject",
  "spoof","crack","exploit","payload","tunnel",
  "vpn","socks","relay","forward","gate",
]

const FALSE_POSITIVE_IPS = new Set([
  "104.29.152.79","104.29.152.107","92.223.118.254","23.221.214.168",
  "23.192.36.217","54.69.69.125","104.29.152.189","104.29.137.146",
  "104.29.155.56","104.29.137.203","104.29.155.129","104.29.137.125",
  "104.29.158.97","104.29.152.95","104.29.153.53","104.29.159.185",
  "104.29.157.123","104.29.152.27","104.29.157.107","104.29.137.16",
  "104.29.152.164","104.29.137.53","104.29.135.227","104.29.158.139",
  "104.29.152.157","104.29.156.174","104.29.156.24","104.29.154.91",
  "104.29.155.27","104.29.156.120","104.29.137.112",
])

const FF_PROXY_LOGIN_DOMAINS = new Set([
  "version.ffmax.purplevioleto.com","version.ggwhitehawk.com",
  "loginbp.ggpolarbear.com","gin.freefiremobile.com",
  "100067.connect.garena.com","100067.msdk.garena.com",
  "client.us.freefiremobile.com","client.sea.freefiremobile.com",
  "sacnetwork.ggblueshark.com","sacevent.ggblueshark.com",
])

const FF_LEGIT_CALLERS = new Set(["com.dts.freefireth","com.dts.freefiremax"])

const KNOWN_CHEAT_INFRA = {
  "46.202.145.85":      "Fatality Cheats — servidor confirmado",
  "fatalitycheats.xyz": "Fatality Cheats — domínio oficial do cheat",
  "anubisw.online":     "Servidor de cheat confirmado — Free Fire",
  "api.baontq.xyz":     "API de cheat confirmado — Free Fire",
  "version.ffmax.purplevioleto.com": "Versão modificada Free Fire MAX — cheat confirmado",
  "version.ggwhitehawk.com":         "White Hawk cheat — servidor confirmado",
  "loginbp.ggpolarbear.com":         "Polar Bear cheat — servidor confirmado",
}

const IGNORED_BUNDLES = new Set([
  "com.hammerandchisel.discord",
  "com.zhiliaoapp.musically",
])

// ─── CATEGORIAS DE APPS SUSPEITOS ───────────────────────────────────────────

const IPS_CHEAT_EXACT = new Set([
  "com.touchingapp.potatsolite","com.touchingapp.potatso",
  "com.shadowrocket.Shadowrocket","com.liguangming.Shadowrocket",
  "com.monite.proxyff","com.nssurge.inc.surge-ios",
  "com.luo.quantumultx","group.com.luo.quantumult",
  "com.github.shadowsocks","com.netease.trojan",
  "com.hiddify.app","com.karing.app","com.metacubex.ClashX",
  "com.ssrss.Ssrss","com.adguard.ios.AdguardPro",
  "com.privateinternetaccess.ios","com.futureland.vpnmaster",
  "com.cloudflare.1dot1dot1dot1",
  "com.opa334.dopamine","org.coolstar.sileo","org.coolstar.odyssey",
  "com.electrateam.unc0ver","com.tihmstar.checkra1n",
  "org.taurine.jailbreak","xyz.palera1n.palera1n",
  "com.opa334.TrollStore","com.opa334.TrollStoreHelper",
  "com.opa334.trolldecrypt","com.opa334.trollfools",
  "xyz.willy.Zebra","com.cydia.Cydia",
  "com.rileytestut.AltStore","com.altstore.altstoreclassic",
  "com.sideloadly.sideloadly","com.esign.ios","com.esign.esign",
  "com.iosgods.iosgods","com.gbox.pubg",
  "com.tigisoftware.Filza","com.tigisoftware.FilzaFree",
  "app.ish.iSH","com.septudio.SSHClientLite",
  "live.cclerc.geranium","com.shpion.cleaner",
  "com.ifunbox.ifunbox","com.limneos.adprivacy",
  "com.apple.dt.Xcode","com.apple.Preferences.Developer",
  "com.apple.TestFlight","io.nextdns.NextDNS",
  "developer.apple.wwdc-Release",
  "com.v2box.ios","com.streisand.Streisand","com.getlantern.lantern",
  "com.psiphon3.PsiphonForIOS","com.openVPN.OpenVPN-Connect",
])

const IPS_CHEAT_CATEGORIES = {
  "com.apple.TestFlight":              "critical",
  "com.opa334.dopamine":               "critical",
  "org.coolstar.sileo":                "critical",
  "org.coolstar.odyssey":              "critical",
  "com.electrateam.unc0ver":           "critical",
  "com.tihmstar.checkra1n":            "critical",
  "org.taurine.jailbreak":             "critical",
  "xyz.palera1n.palera1n":             "critical",
  "com.opa334.TrollStore":             "critical",
  "com.opa334.TrollStoreHelper":       "critical",
  "com.opa334.trolldecrypt":           "critical",
  "com.opa334.trollfools":             "critical",
  "com.rileytestut.AltStore":          "critical",
  "com.altstore.altstoreclassic":      "critical",
  "com.sideloadly.sideloadly":         "critical",
  "com.esign.ios":                     "critical",
  "com.esign.esign":                   "critical",
  "com.iosgods.iosgods":               "critical",
  "com.gbox.pubg":                     "critical",
  "com.tigisoftware.Filza":            "critical",
  "com.tigisoftware.FilzaFree":        "critical",
  "app.ish.iSH":                       "critical",
  "com.monite.proxyff":                "critical",
  "com.touchingapp.potatsolite":       "critical",
  "com.touchingapp.potatso":           "critical",
  "com.shadowrocket.Shadowrocket":     "critical",
  "com.liguangming.Shadowrocket":      "critical",
  "com.v2box.ios":                     "critical",
  "com.streisand.Streisand":           "critical",
  "com.cloudflare.1dot1dot1dot1":      "vpn",
  "io.nextdns.NextDNS":                "vpn",
  "com.privateinternetaccess.ios":     "vpn",
  "com.futureland.vpnmaster":          "vpn",
  "com.nssurge.inc.surge-ios":         "vpn",
  "com.luo.quantumultx":               "vpn",
  "group.com.luo.quantumult":          "vpn",
  "com.github.shadowsocks":            "vpn",
  "com.netease.trojan":                "vpn",
  "com.hiddify.app":                   "vpn",
  "com.karing.app":                    "vpn",
  "com.metacubex.ClashX":              "vpn",
  "com.ssrss.Ssrss":                   "vpn",
  "com.adguard.ios.AdguardPro":        "vpn",
  "com.getlantern.lantern":            "vpn",
  "com.psiphon3.PsiphonForIOS":        "vpn",
  "com.openVPN.OpenVPN-Connect":       "vpn",
  "com.apple.dt.Xcode":                "developer",
  "com.apple.Preferences.Developer":   "developer",
  "developer.apple.wwdc-Release":      "developer",
}

const IPS_CHEAT_KEYWORDS = [
  "filza","esign","gbox","sideload","dopamine","sileo",
  "trollstore","trolldecrypt","trollfools","trollhelper",
  "spoofer","cleaner","unc0ver","checkra1n","jailbreak",
  "cydia","zebra","altstore","iosgods","geranium",
  "potatso","shadowrocket","surge","quantumult","hiddify",
  "shadowsocks","trojan","karing","proxyff",
  "netlify","cheat","hack","bypass","inject","tweak",
  "substrate","substitute","libhooker","v2ray","v2box",
  "lantern","psiphon","streisand",
]

// ─── NOVO: ANÁLISE DE PADRÃO TEMPORAL ───────────────────────────────────────

function analyzeTemporalPatterns(netEntries) {
  // Detecta picos anômalos de conexão que indicam uso de cheat em partida
  let byMinute = {}
  for (let e of netEntries) {
    if (!e.timeStamp) continue
    let d = new Date(e.timeStamp)
    let key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}`
    byMinute[key] = (byMinute[key] || 0) + (e.hits || 1)
  }
  let minutes = Object.entries(byMinute).sort((a,b) => b[1] - a[1])
  let peakMinute = minutes[0] || null
  let avgPerMinute = minutes.length
    ? minutes.reduce((s,[,v]) => s + v, 0) / minutes.length
    : 0
  let spikes = minutes.filter(([,v]) => v > avgPerMinute * 3)
  return { peakMinute, avgPerMinute: Math.round(avgPerMinute), spikes: spikes.length, totalMinutes: minutes.length }
}

// ─── NOVO: DETECÇÃO DE APPS GHOST (acessando domínios suspeitos sem aparecer no usage) ──

// ─── PARSE / VALIDAÇÃO ──────────────────────────────────────────────────────

function parseNdjson(content) {
  let trimmed = content.trim()
  if (trimmed.startsWith("[")) {
    try { return JSON.parse(trimmed) } catch(e) {}
  }
  return trimmed.split("\n")
    .map(l => l.trim()).filter(l => l.length > 0)
    .map(l => { try { return JSON.parse(l) } catch(e) { return null } })
    .filter(Boolean)
}

function parseIpsFile(content) {
  try {
    let lines = content.trim().split("\n").map(l => l.trim()).filter(Boolean)
    let headerLine = lines.find(l => l.startsWith("{"))
    let dataLine   = lines.find(l => l.startsWith("["))
    let header = null
    try { header = headerLine ? JSON.parse(headerLine) : null } catch(e) {}
    let entries = []
    try { entries = dataLine ? JSON.parse(dataLine) : [] } catch(e) {}
    return { header, entries }
  } catch(e) { return { header: null, entries: [] } }
}

function looksLikePrivacyReport(content) {
  let sample = content.trim().slice(0, 500)
  return sample.includes("networkActivity") || sample.includes("bundleID") || sample.includes("timeStamp")
}

function looksLikeUsageFile(content) {
  let sample = content.trim().slice(0, 300)
  return sample.includes("xp_amp_app_usage") || sample.includes("roots_installed") || sample.includes("usageClientId")
}

function validateReport(entries) {
  if (!entries || entries.length === 0)
    return { ok: false, reason: "Arquivo vazio ou sem entradas válidas." }
  let hasNet    = entries.some(e => e.type === "networkActivity")
  let hasAccess = entries.some(e => e.type === "access")
  let hasBundleID = entries.some(e => e.bundleID || (e.accessor && e.accessor.identifier))
  let hasTimestamp = entries.some(e => e.timeStamp)
  if (!hasNet && !hasAccess)
    return { ok: false, reason: "Nenhuma entrada de rede ou acesso encontrada.\nEste não parece ser um App Privacy Report válido." }
  if (!hasBundleID)
    return { ok: false, reason: "Nenhum bundleID encontrado.\nO arquivo pode estar corrompido ou foi modificado." }
  if (!hasTimestamp)
    return { ok: false, reason: "Nenhum timestamp encontrado.\nO arquivo pode estar corrompido ou foi modificado." }
  let timestamps = entries.map(e => e.timeStamp).filter(Boolean)
  let valid = timestamps.filter(t => { let y = parseInt(t.slice(0,4)); return y >= 2020 && y <= 2030 })
  if (valid.length < timestamps.length * 0.5)
    return { ok: false, reason: "Timestamps fora do intervalo esperado.\nO arquivo pode ter sido adulterado." }
  let netEntries = entries.filter(e => e.type === "networkActivity")
  let validNet = netEntries.filter(e => e.domain && e.bundleID)
  if (netEntries.length > 0 && validNet.length < netEntries.length * 0.3)
    return { ok: false, reason: "Muitas entradas de rede sem domain/bundleID.\nO arquivo pode ter sido manipulado." }
  return { ok: true }
}

// ─── ANÁLISE DE IPS FILE ────────────────────────────────────────────────────

function analyzeIps(parsed) {
  let entries = parsed.entries || parsed || []
  let results = []
  let seen = new Set()
  for (let e of entries) {
    let bid = e.bundleId || ""
    if (!bid || seen.has(bid)) continue
    seen.add(bid)
    let reason = null
    let category = "warning"
    if (IPS_CHEAT_EXACT.has(bid)) {
      reason = CHEAT_APPS[bid] || bid
      category = IPS_CHEAT_CATEGORIES[bid] || "warning"
    } else {
      let bidLower = bid.toLowerCase()
      for (let kw of IPS_CHEAT_KEYWORDS) {
        if (bidLower.includes(kw)) {
          reason = `Keyword suspeita: "${kw}" no bundle ID`
          break
        }
      }
    }
    if (!reason) {
      let bidLower = bid.toLowerCase()
      const FF_LEGIT = ["com.dts.freefireth","com.dts.freefiremax"]
      if (!FF_LEGIT.includes(bid) && (bidLower.includes("freefire") || bidLower.includes("freefir"))) {
        reason = "Cópia suspeita do Free Fire — bundle ID modificado"
        category = "critical"
      }
    }
    if (reason) results.push({
      bundleId: bid, version: e.shortAppVersion || "?",
      eventType: e.eventType || "?", count: e.count || 0,
      reason, category,
    })
  }
  return results
}

// ─── IP LOOKUP ───────────────────────────────────────────────────────────────

const FIELDS = "status,country,city,isp,org,hosting,proxy,query,reverse,as"

async function lookupBatch(targets) {
  try {
    let req = new Request(`http://ip-api.com/batch?fields=${FIELDS}`)
    req.method = "POST"
    req.body = Data.fromString(JSON.stringify(targets))
    req.headers = { "Content-Type": "application/json" }
    req.timeoutInterval = 15
    let results = await req.loadJSON()
    if (!Array.isArray(results)) return []
    // FIX: garante alinhamento correto com o array de entrada
    while (results.length < targets.length) results.push(null)
    return results
  } catch(e) { return [] }
}

function isIPv4(s) { return /^(\d{1,3}\.){3}\d{1,3}$/.test(s) }
function isIPv6(s) { return s.includes(":") && !s.includes(".") }
function isIP(s)   { return isIPv4(s) || isIPv6(s) }

function classifyIP(info, domain) {
  if (!info) return { severity: null, reasons: [] }
  let reasons = [], severity = null, tldFlag = false
  let domLow = (domain || "").toLowerCase()
  for (let tld of SUSPICIOUS_TLDS) {
    if (domLow.endsWith(tld) || domLow.includes(tld + "/")) {
      severity = "HIGH"; tldFlag = true
      reasons.push(`TLD suspeito detectado: "${tld}" — padrão comum em cheats/proxies`)
      break
    }
  }
  if (!tldFlag) {
    let parts = domLow.split(".")[0]
    for (let word of SUSPICIOUS_DOMAIN_WORDS) {
      if (parts.includes(word) || domLow.includes(word + ".")) {
        severity = "HIGH"; tldFlag = true
        reasons.push(`Palavra suspeita no domínio: "${word}"`)
        break
      }
    }
  }
  if (info.hosting) { severity = "HIGH"; reasons.push(`VPS/HOSTING — ISP: ${info.isp}`) }
  if (info.proxy)   { severity = "HIGH"; reasons.push("PROXY / VPN detectado") }
  let asn = (info.as || "").split(" ")[0].toUpperCase()
  if (CHEAT_PROXY_ASN[asn]) {
    let isCF = asn === "AS13335"
    if (isCF) {
      if (/^[\d.:]+$/.test(domain || "")) { severity = "HIGH"; reasons.push(`Cloudflare acessado via IP direto — padrão de proxy cheat (${asn})`) }
    } else { severity = "HIGH"; reasons.push(`ASN de cheat proxy conhecido: ${asn} — ${CHEAT_PROXY_ASN[asn]}`) }
  }
  let rdns = (info.reverse || "").toLowerCase()
  if (rdns) {
    for (let pattern of RDNS_HOSTING_PATTERNS) {
      if (rdns.includes(pattern)) { severity = severity || "HIGH"; reasons.push(`rDNS de servidor: ${info.reverse}`); break }
    }
    if (rdns.match(/^srv\d+\.hstgr\.cloud$/)) { severity = "HIGH"; reasons.push(`Hostinger VPS (padrão cheat proxy BR): ${info.reverse}`) }
  } else if (info.hosting) { reasons.push("Sem rDNS (PTR) — típico de VPS usado como proxy") }
  let orgLower = ((info.org || "") + " " + (info.isp || "") + " " + (info.as || "")).toLowerCase()
  for (let kw of VPS_HOSTING_KEYWORDS) {
    if (orgLower.includes(kw)) { severity = severity || "MEDIUM"; reasons.push(`Org/ISP associado a hospedagem/cheat proxy: ${kw}`); break }
  }
  return { severity, reasons }
}

async function probeHost(domain) {
  let safe = ["apple.com","icloud.com","google.com","googleapis.com",
              "gstatic.com","amazon.com","microsoft.com","iphone","localhost",
              "akamai","cloudfront","fastly","edgekey","aaplimg"]
  if (safe.some(s => domain.toLowerCase().includes(s))) return null
  let result = { status: null, banner: null, online: false, suspicious: false }
  for (let scheme of ["https","http"]) {
    try {
      let req = new Request(`${scheme}://${domain}`)
      req.timeoutInterval = 6
      req.allowInsecureRequest = true
      let body = await req.loadString()
      result.online = true
      let resp = req.response || {}
      result.status = resp.statusCode || 0
      let headers = resp.headers || {}
      let serverHeader = (headers["Server"] || headers["server"] || "").toLowerCase()
      let bodyLow = (body || "").slice(0, 600).toLowerCase()
      let combined = serverHeader + " " + bodyLow
      let suspiciousBanners = ["nginx","apache","ubuntu","debian","centos","mitmproxy",
        "squid","haproxy","openresty","caddy","traefik","403 forbidden","bad gateway","bad request","proxy error"]
      if (serverHeader) { result.banner = serverHeader.split("/")[0].trim(); result.suspicious = true }
      else { for (let b of suspiciousBanners) { if (combined.includes(b)) { result.banner = b; result.suspicious = true; break } } }
      let sc = result.status
      if (sc === 403 || sc === 502 || sc === 504 || sc === 400) result.suspicious = true
      break
    } catch(e) { result.online = false }
  }
  return result
}

function wait(ms) { return new Promise(resolve => Timer.schedule(ms, false, resolve)) }

// ─── ANÁLISE PRINCIPAL ──────────────────────────────────────────────────────

async function analyze(entries) {
  let netEntries = entries.filter(e => e.type === "networkActivity")
  let domainHits = {}, domainBundles = {}
  for (let e of netEntries) {
    if (IGNORED_BUNDLES.has(e.bundleID)) continue
    let d = e.domain || ""
    if (!d) continue
    domainHits[d] = (domainHits[d] || 0) + (e.hits || 1)
    if (!domainBundles[d]) domainBundles[d] = new Set()
    domainBundles[d].add(e.bundleID || "?")
  }
  let allDomains = Object.entries(domainHits).sort((a,b) => b[1]-a[1]).map(([d]) => d)
  console.log(`Total domínios únicos: ${allDomains.length}`)
  let allBundles = new Set()
  for (let e of netEntries) { if (e.bundleID && !IGNORED_BUNDLES.has(e.bundleID)) allBundles.add(e.bundleID) }

  // Detecção FF clone — FIX: lógica corrigida
  const FF_LEGIT_BUNDLES = new Set(["com.dts.freefireth","com.dts.freefiremax"])
  let ffFakeFindings = []
  for (let bid of allBundles) {
    if (FF_LEGIT_BUNDLES.has(bid)) continue
    let bidLower = bid.toLowerCase()
    let isFFClone = !FF_LEGIT_BUNDLES.has(bid) && (bidLower.includes("freefire") || bidLower.includes("freefir"))
    if (isFFClone) {
      let appEntries = netEntries.filter(e => e.bundleID === bid)
      let appHits = appEntries.reduce((s,e) => s + (e.hits||1), 0)
      let appDomains = [...new Set(appEntries.map(e => e.domain).filter(Boolean))]
      ffFakeFindings.push({ bundleID: bid, desc: "Cópia suspeita do Free Fire — bundle ID modificado", hits: appHits, domains: appDomains })
    }
  }

  // Apps de cheat conhecidos
  let cheatAppFindings = []
  for (let [bundleID, desc] of Object.entries(CHEAT_APPS)) {
    if (allBundles.has(bundleID)) {
      let appEntries = netEntries.filter(e => e.bundleID === bundleID)
      let appHits = appEntries.reduce((s,e) => s + (e.hits||1), 0)
      let appDomains = [...new Set(appEntries.map(e => e.domain).filter(Boolean))]
      cheatAppFindings.push({ bundleID, desc, hits: appHits, domains: appDomains })
    }
  }
  cheatAppFindings = [...ffFakeFindings, ...cheatAppFindings]

  // Domínios FF legítimos vistos
  let ffLegitDomainsSeen = new Set()
  for (let e of netEntries) {
    if (FF_LEGIT_CALLERS.has(e.bundleID) && FF_PROXY_LOGIN_DOMAINS.has((e.domain||"").toLowerCase()))
      ffLegitDomainsSeen.add((e.domain||"").toLowerCase())
  }

  // Proxy login bypass
  let proxyLoginFindings = [], proxyLoginSeen = {}
  for (let e of netEntries) {
    let d = (e.domain || "").toLowerCase()
    let bid = e.bundleID || ""
    if (!bid || FF_LEGIT_CALLERS.has(bid) || IGNORED_BUNDLES.has(bid)) continue
    if (!FF_PROXY_LOGIN_DOMAINS.has(d) || ffLegitDomainsSeen.has(d)) continue
    if (!proxyLoginSeen[d]) proxyLoginSeen[d] = { domain: e.domain, bundles: new Set(), hits: 0 }
    proxyLoginSeen[d].bundles.add(bid)
    proxyLoginSeen[d].hits += (e.hits||1)
  }
  for (let [d, info] of Object.entries(proxyLoginSeen))
    proxyLoginFindings.push({ domain: info.domain, bundles: [...info.bundles], hits: info.hits })

  // Infra de cheat conhecida
  let knownCheatFindings = []
  for (let e of netEntries) {
    let d = (e.domain || "").toLowerCase()
    let bid = e.bundleID || ""
    if (FF_LEGIT_CALLERS.has(bid) && FF_PROXY_LOGIN_DOMAINS.has(d)) continue
    for (let [indicator, desc] of Object.entries(KNOWN_CHEAT_INFRA)) {
      if (d === indicator.toLowerCase() || d.endsWith("." + indicator.toLowerCase())) {
        if (FF_PROXY_LOGIN_DOMAINS.has(indicator.toLowerCase()) && FF_LEGIT_CALLERS.has(bid)) continue
        let existing = knownCheatFindings.find(k => k.indicator === indicator)
        if (existing) { existing.hits += (e.hits||1); if (bid) existing.bundles.add(bid) }
        else knownCheatFindings.push({ indicator, desc, hits: e.hits||1, bundles: new Set(bid ? [bid] : []) })
      }
    }
  }
  knownCheatFindings = knownCheatFindings.map(k => ({ ...k, bundles: [...k.bundles] }))

  // Análise de padrão temporal (NOVO)
  let temporalAnalysis = analyzeTemporalPatterns(netEntries)

  // NOVO: Top apps por conexões
  let appHitsMap = {}
  for (let e of netEntries) {
    let bid = e.bundleID || "unknown"
    appHitsMap[bid] = (appHitsMap[bid] || 0) + (e.hits || 1)
  }
  let topApps = Object.entries(appHitsMap).sort((a,b) => b[1]-a[1]).slice(0, 10)

  // IP Lookup em batches
  const CHUNK = 100
  let candidates = []
  for (let i = 0; i < allDomains.length; i += CHUNK) {
    let chunk = allDomains.slice(i, i + CHUNK)
    let chunkNum = Math.floor(i/CHUNK) + 1
    let totalChunks = Math.ceil(allDomains.length/CHUNK)
    console.log(`Batch ${chunkNum}/${totalChunks} — ${chunk.length} domínios`)
    let results = await lookupBatch(chunk)
    if (chunkNum === Math.ceil(totalChunks/2) && totalChunks > 1) Speech.speak(S.half)
    for (let j = 0; j < chunk.length; j++) {
      let info = results[j]
      let domain = chunk[j]
      if (!domain) continue
      let ip = (info && info.query) || domain
      if (FALSE_POSITIVE_IPS.has(ip) || FALSE_POSITIVE_IPS.has(domain)) continue
      let domLow2 = domain.toLowerCase()
      let isTldSuspect = SUSPICIOUS_TLDS.some(t => domLow2.endsWith(t)) ||
                         SUSPICIOUS_DOMAIN_WORDS.some(w => domLow2.split(".")[0].includes(w))
      let severity = null, reasons = []
      if (info && info.status === "success") {
        let classified = classifyIP(info, domain)
        severity = classified.severity; reasons = classified.reasons
      }
      if (!severity && isTldSuspect) {
        severity = "HIGH"
        reasons = ["TLD suspeito: domínio com extensão de alto risco — padrão comum em servidores de cheat"]
      }
      if (!severity && !isTldSuspect) continue
      candidates.push({
        severity, domain, ip,
        country: (info && info.country) || "?",
        city:    (info && info.city)    || "?",
        isp:     (info && info.isp)     || "?",
        org:     (info && info.org)     || "?",
        as:      (info && info.as)      || "?",
        hosting: (info && info.hosting) || false,
        proxy:   (info && info.proxy)   || false,
        reverse: (info && info.reverse) || "",
        hits:    domainHits[domain],
        bundles: [...domainBundles[domain]].slice(0,4),
        reasons, tldSuspect: isTldSuspect,
      })
    }
    if (i + CHUNK < allDomains.length) await wait(1400)
  }

  console.log(`Iniciando probe HTTP em ${candidates.length} suspeitos...`)
  Speech.speak(S.probe)
  let probeResults = await Promise.all(candidates.map(c => probeHost(c.domain)))

  let findings = candidates.map((c, idx) => {
    let probe = probeResults[idx]
    let severity = c.severity, reasons = [...c.reasons]
    if (probe) {
      if (probe.suspicious && probe.banner) { severity = "HIGH"; reasons.push(`Servidor: ${probe.banner}`) }
      if (probe.status === 403) reasons.push("HTTP 403 — ativo mas bloqueando acesso (padrão de proxy)")
      if (!probe.online) reasons.push("Servidor offline ou sem resposta HTTP")
    }
    return { ...c, severity, reasons, probe, tldSuspect: c.tldSuspect }
  })

  const ASN_SET = new Set(Object.keys(CHEAT_PROXY_ASN))
  function hasSuspiciousTLD(domain) {
    let d = (domain || "").toLowerCase()
    return SUSPICIOUS_TLDS.some(t => d.endsWith(t) || d.includes(t+"/")) ||
           SUSPICIOUS_DOMAIN_WORDS.some(w => d.split(".")[0].includes(w))
  }
  findings.sort((a,b) => {
    let aTld = hasSuspiciousTLD(a.domain)?0:1, bTld = hasSuspiciousTLD(b.domain)?0:1
    if (aTld !== bTld) return aTld - bTld
    let aAsn = (a.as||"").split(" ")[0].toUpperCase(), bAsn = (b.as||"").split(" ")[0].toUpperCase()
    let aKnown = ASN_SET.has(aAsn)?0:1, bKnown = ASN_SET.has(bAsn)?0:1
    if (aKnown !== bKnown) return aKnown - bKnown
    let sevOrder = { HIGH:0, MEDIUM:1 }
    if (a.severity !== b.severity) return sevOrder[a.severity] - sevOrder[b.severity]
    let aOnline = (a.probe && a.probe.online)?0:1, bOnline = (b.probe && b.probe.online)?0:1
    if (aOnline !== bOnline) return aOnline - bOnline
    return b.hits - a.hits
  })

  // Ghost app findings
  const GHOST_SUSPECT_DOMAINS = new Set(Object.keys(KNOWN_CHEAT_INFRA))
  let suspectByBundle = {}
  for (let e of netEntries) {
    let bid = e.bundleID || "", dom = (e.domain || "").toLowerCase()
    if (!bid) continue
    if (FF_LEGIT_CALLERS.has(bid) && FF_PROXY_LOGIN_DOMAINS.has(dom)) continue
    let isKnown = GHOST_SUSPECT_DOMAINS.has(dom)
    let isTld   = SUSPICIOUS_TLDS.some(t => dom.endsWith(t))
    if (isKnown || isTld) {
      if (!suspectByBundle[bid]) suspectByBundle[bid] = { domains: [], hits: 0 }
      suspectByBundle[bid].domains.push(e.domain)
      suspectByBundle[bid].hits += (e.hits||1)
    }
  }
  let ghostAppFindings = Object.entries(suspectByBundle).map(([bid, info]) => ({
    bundleID: bid, domains: [...new Set(info.domains)], hits: info.hits
  }))

  return { findings, netEntries, cheatAppFindings, knownCheatFindings, ghostAppFindings, proxyLoginFindings, temporalAnalysis, topApps, allDomains }
}

// ─── HTML BUILDER ────────────────────────────────────────────────────────────

function buildHTML(findings, netEntries, cheatAppFindings, knownCheatFindings, ipsFindings, ipsMeta, ghostAppFindings, proxyLoginFindings, temporalAnalysis, topApps, allDomains, filename) {
  let allTimestamps = netEntries.map(e => e.timeStamp).filter(Boolean).sort()
  let firstTs = allTimestamps.length ? new Date(allTimestamps[0]) : null
  let lastTs  = allTimestamps.length ? new Date(allTimestamps[allTimestamps.length-1]) : null

  function fmtDt(d) {
    if (!d) return "?"
    return d.toLocaleString("pt-BR", { day:"2-digit", month:"2-digit", year:"numeric", hour:"2-digit", minute:"2-digit" })
  }

  let uptimeStr = "?", uptimeWarning = false
  if (firstTs && lastTs) {
    let diffMs = lastTs - firstTs, diffMin = Math.floor(diffMs/60000)
    let diffH = Math.floor(diffMin/60), diffD = Math.floor(diffH/24)
    let remH = diffH%24, remMin = diffMin%60
    if (diffD > 0)      uptimeStr = `${diffD}d ${remH}h ${remMin}min`
    else if (diffH > 0) uptimeStr = `${diffH}h ${remMin}min`
    else                uptimeStr = `${diffMin} minutos`
    if (diffMin < 20)   uptimeWarning = true
  }

  let staleWarning = false, staleStr = ""
  if (lastTs) {
    let diffFromNow = Math.floor((new Date() - lastTs) / 60000)
    if (diffFromNow > 15) {
      staleWarning = true
      if (diffFromNow >= 1440) { let d=Math.floor(diffFromNow/1440),h=Math.floor((diffFromNow%1440)/60); staleStr=`${d}d ${h}h atrás` }
      else if (diffFromNow >= 60) { let h=Math.floor(diffFromNow/60),m=diffFromNow%60; staleStr=`${h}h ${m}min atrás` }
      else staleStr = `${diffFromNow} minutos atrás`
    }
  }

  // App Store
  let appStoreEntries = netEntries.filter(e => e.bundleID === "com.apple.AppStore" && e.timeStamp).sort((a,b) => b.timeStamp.localeCompare(a.timeStamp))
  let appStoreLastTs = appStoreEntries.length ? new Date(appStoreEntries[0].timeStamp) : null

  // FF sessions
  const FF_BUNDLES = ["com.dts.freefiremax","com.dts.freefireth"]
  const FF_FB_LOGIN_DOMAIN = "m.facebook.com"
  const FF_SECONDARY_DOMAINS = {
    "twitter.com":"Login Twitter/X","api.twitter.com":"Login Twitter/X",
    "oauth2.googleapis.com":"Login Gmail","accounts.google.com":"Login Gmail",
    "apis.google.com":"Login Gmail","api.vk.com":"Login VK","login.vk.com":"Login VK",
  }
  let ffAll = netEntries.filter(e => FF_BUNDLES.includes(e.bundleID) && e.timeStamp).sort((a,b) => a.timeStamp.localeCompare(b.timeStamp))
  let ffSessionGroups = [], _cur = []
  for (let e of ffAll) {
    if (_cur.length === 0) { _cur.push(e); continue }
    let gap = new Date(e.timeStamp) - new Date(_cur[_cur.length-1].timeStamp)
    if (gap > 2*60*1000) { ffSessionGroups.push(_cur); _cur = [e] } else _cur.push(e)
  }
  if (_cur.length > 0) ffSessionGroups.push(_cur)
  function resolveSession(group) {
    let domains = new Set(group.map(e => e.domain))
    let anchor = group[group.length-1]
    if (domains.has(FF_FB_LOGIN_DOMAIN)) return { ts: anchor.timeStamp, loginType: "Login Facebook", bundleID: anchor.bundleID }
    for (let d of domains) { if (FF_SECONDARY_DOMAINS[d]) return { ts: anchor.timeStamp, loginType: FF_SECONDARY_DOMAINS[d], bundleID: anchor.bundleID } }
    return null
  }
  let ffSessions = ffSessionGroups.map(resolveSession).filter(Boolean).sort((a,b) => b.ts.localeCompare(a.ts)).slice(0,3).map(s => ({ ...s, ts: fmtDt(new Date(s.ts)) }))
  let ffStr = ffSessions.length > 0 ? ffSessions[0].ts : null
  let ffVersion = ffAll.length > 0 ? (ffAll[0].bundleID === "com.dts.freefiremax" ? "Free Fire MAX" : "Free Fire") : null

  let highCount = findings.filter(f => f.severity === "HIGH").length
  let medCount  = findings.filter(f => f.severity === "MEDIUM").length
  proxyLoginFindings = proxyLoginFindings || []
  let criticalCount = cheatAppFindings.length + knownCheatFindings.length + proxyLoginFindings.length

  // ── CARDS CRÍTICOS ──────────────────────────────────────────────────────
  let criticalCards = ""
  for (let p of proxyLoginFindings) {
    let bundleList = p.bundles.map(b => `<span class="bundle" style="color:#ff6600">${b}</span>`).join(" ")
    criticalCards += `<div class="card critical" style="border-left-color:#ff4400;">
      <div class="card-header"><span class="badge critical">🔒 PROXY BYPASS LOGIN — CRÍTICO</span><span class="conns">${p.hits} conexões</span></div>
      <div class="card-domain">${p.domain}</div>
      <div class="grid">
        <div class="row"><span class="label">Detecção</span><span class="val reason" style="color:#ff8800;font-weight:bold">Domínio exclusivo do Free Fire chamado por app não autorizado — proxy interceptando login</span></div>
        <div class="row"><span class="label">App interceptor</span><span class="val">${bundleList}</span></div>
        <div class="row"><span class="label">Esperado de</span><span class="val"><span class="bundle" style="color:#44ff88">com.dts.freefireth</span> <span class="bundle" style="color:#44ff88">com.dts.freefiremax</span></span></div>
      </div></div>`
  }
  for (let k of knownCheatFindings) {
    let bundleList = k.bundles.map(b => `<span class="bundle">${b}</span>`).join(" ")
    criticalCards += `<div class="card critical">
      <div class="card-header"><span class="badge critical" data-badge-type="known-cheat">⚠ CRÍTICO — CHEAT CONFIRMADO</span><span class="conns">${k.hits} conexões</span></div>
      <div class="card-domain">${k.indicator}</div>
      <div class="grid">
        <div class="row"><span class="label">Cheat</span><span class="val reason" style="color:#ff4444;font-weight:bold">${k.desc}</span></div>
        <div class="row"><span class="label">Indicador</span><span class="val">${k.indicator.includes(".")&&!k.indicator.match(/^\d+/)?"Domínio":"IP"} detectado no relatório de rede</span></div>
        ${bundleList?`<div class="row"><span class="label">Usado por</span><span class="val">${bundleList}</span></div>`:""}
      </div></div>`
  }
  for (let f of cheatAppFindings) {
    let suspectDomainSet = new Set(findings.map(f2 => f2.domain))
    let suspectDomains = f.domains.filter(d => suspectDomainSet.has(d))
    let suspectRows = suspectDomains.map(d => {
      let match = findings.find(f2 => f2.domain === d)
      let info = match ? ` — ${match.isp} (${match.country})` : ""
      return `<div class="domain-row"><span class="domain-badge ${match?match.severity.toLowerCase():""}" data-sev="${match?match.severity:""}">${match?(match.severity==="HIGH"?"SUSPEITO":"POSSÍVEL"):""}</span> ${d}${info}</div>`
    }).join("")
    criticalCards += `<div class="card critical">
      <div class="card-header"><span class="badge critical">⚠ CRÍTICO — APP PROXY/CHEAT</span><span class="conns">${f.hits} conexões</span></div>
      <div class="card-domain">${f.bundleID}</div>
      <div class="grid">
        <div class="row"><span class="label">App</span><span class="val reason">${f.desc}</span></div>
        <div class="row"><span class="label">IPs suspeitos<br><span class="sub">${suspectDomains.length} de ${f.domains.length} domínios</span></span>
          <span class="val">${suspectRows||'<span class="none">Nenhum IP suspeito detectado</span>'}</span></div>
      </div></div>`
  }

  // ── GHOST SECTION ───────────────────────────────────────────────────────
  let ghostSection = ""
  if (ghostAppFindings && ghostAppFindings.length > 0) {
    let ghostRows = ghostAppFindings.map(g => {
      let domList = g.domains.slice(0,5).map(d => `<span class="ghost-domain">${d}</span>`).join("")
      let more = g.domains.length > 5 ? `<span class="ghost-more">+${g.domains.length-5} mais</span>` : ""
      return `<div class="ghost-row">
        <div class="ghost-row-left"><span class="ghost-bundle">${g.bundleID}</span><div class="ghost-domains">${domList}${more}</div></div>
        <div class="ghost-row-right"><span class="ghost-hits">${g.hits} hits</span><span class="ghost-label">⚠ Domínios suspeitos</span></div></div>`
    }).join("")
    ghostSection = `<div class="ghost-banner">
      <div class="ghost-header"><span class="ghost-icon">👻</span>
        <div class="ghost-title-block"><div class="ghost-title">Apps com domínios suspeitos</div><div class="ghost-sub">Presente no relatório de rede com conexões a infra suspeita</div></div>
        <span class="ghost-count">${ghostAppFindings.length}</span></div>
      <div class="ghost-rows">${ghostRows}</div>
      <div class="ghost-hint">⚠ Verifique se esses apps são legítimos e se foram instalados corretamente</div></div>`
  }

  // ── IPS SECTION ─────────────────────────────────────────────────────────
  let ipsSection = ""
  if (ipsFindings && ipsFindings.length > 0) {
    let ipsRows = ipsFindings.map(f => `<div class="ips-row ips-row-${f.category||'warning'}">
      <div class="ips-row-left">
        <div class="ips-row-top"><span class="ips-cat-badge ips-cat-${f.category||'warning'}">${f.category==='critical'?'🚨 CRÍTICO':f.category==='vpn'?'🔒 VPN/PROXY':f.category==='developer'?'🛠 DEVELOPER':'⚠ SUSPEITO'}</span></div>
        <span class="ips-bundle">${f.bundleId}</span>
        <span class="ips-reason">${f.reason}</span>
      </div>
      <div class="ips-row-right">
        <span class="ips-version">v${f.version}</span>
        <span class="ips-badge ${f.eventType==='launches'?'launched':'installed'}">${f.eventType==='launches'?'▶ Aberto':'⬇ Instalado'}</span>
      </div></div>`).join("")
    ipsSection = `<div class="ips-banner">
      <div class="ips-header"><span class="ips-icon">📲</span>
        <div class="ips-header-text"><div class="ips-title">Apps Suspeitos Instalados</div><div class="ips-sub">Detectados no histórico de uso do dispositivo</div></div>
        <span class="ips-count">${ipsFindings.length}</span></div>
      <div class="ips-rows">${ipsRows}</div>
      <div class="ips-hint">⚠ Apps encontrados nos dados de análise do iPhone — indicam presença de ferramentas de cheat/jailbreak/proxy</div></div>`
  }

  // ── ROOTS WARNING ────────────────────────────────────────────────────────
  let rootsWarn = ""
  if (ipsMeta && ipsMeta.rootsInstalled > 0) {
    rootsWarn = `<div class="roots-banner">
      <div class="roots-icon">🔐</div>
      <div><div class="roots-label">Certificado Raiz Suspeito</div>
        <div class="roots-detail">${ipsMeta.rootsInstalled} certificado${ipsMeta.rootsInstalled>1?"s":""} raiz instalado${ipsMeta.rootsInstalled>1?"s":""}</div>
        <div class="roots-hint">Certificados raiz permitem interceptar tráfego HTTPS — padrão de proxy cheat tipo mitmproxy</div></div></div>`
  }

  // ── STALE BANNER ─────────────────────────────────────────────────────────
  let staleBanner = staleWarning ? `<div class="stale-banner">
    <div class="stale-left">🕑</div>
    <div><div class="stale-label">Arquivo possivelmente antigo</div>
      <div class="stale-time">Último registro: <strong>${staleStr}</strong></div>
      <div class="stale-hint">Suspeita: arquivo gerado fora do período da partida para esconder atividade.</div></div></div>` : ""

  // ── FF BANNER ─────────────────────────────────────────────────────────
  function loginColor(type) {
    if (type.includes("Facebook")) return "#1877f2"
    if (type.includes("Twitter")||type.includes("X")) return "#1da1f2"
    if (type.includes("Gmail")) return "#ea4335"
    if (type.includes("VK")) return "#4a76a8"
    return "#556"
  }
  let ffSessionRows = ffSessions.map((s,i) => {
    let col = loginColor(s.loginType)
    let label = i===0?"Última abertura":i===1?"2ª abertura":"3ª abertura"
    return `<div class="ff-session-row">
      <div class="ff-session-left"><span class="ff-session-num">${label}</span><span class="ff-session-ts">${s.ts}</span></div>
      <span class="ff-login-badge" style="background:${col}22;color:${col};border:1px solid ${col}44">${s.loginType}</span></div>`
  }).join("")
  let ffBanner = ffStr ? `<div class="ff-banner">
    <div class="ff-left">🔥</div>
    <div class="ff-info"><div class="ff-label">${ffVersion||"Free Fire"} — Sessões no período</div>
      ${ffSessionRows}
      <div class="ff-sessions">${ffAll.length} inicializações registradas no período</div>
      <div class="ff-hint">Se a última abertura foi após a partida → aplique o W.O!</div></div></div>` : ""

  let appStoreBanner = appStoreLastTs ? `<div class="appstore-banner">
    <div class="appstore-left">🛒</div>
    <div><div class="appstore-label">App Store aberta</div>
      <div class="appstore-time">${fmtDt(appStoreLastTs)}</div>
      <div class="appstore-hint">Se foi após a partida → aplique o W.O!</div></div></div>` : ""

  // ── NOVO: TOP APPS ────────────────────────────────────────────────────
  let topAppsSection = ""
  if (topApps && topApps.length > 0) {
    let maxHits = topApps[0][1]
    let topRows = topApps.map(([bid, hits], i) => {
      let pct = Math.round((hits / maxHits) * 100)
      let isSuspect = CHEAT_APPS[bid] || IPS_CHEAT_EXACT.has(bid)
      let color = isSuspect ? "#ff4444" : i === 0 ? "#1e90ff" : "#3a5a72"
      return `<div class="topapp-row">
        <div class="topapp-num" style="color:${color}">#${i+1}</div>
        <div class="topapp-info"><div class="topapp-bid" style="color:${isSuspect?"#ff8888":"#ccd"}">${bid}${isSuspect?` <span class="topapp-suspect">⚠ SUSPEITO</span>`:""}</div>
          <div class="topapp-bar"><div class="topapp-fill" style="width:${pct}%;background:${color}55"></div></div></div>
        <div class="topapp-hits">${hits.toLocaleString()}</div></div>`
    }).join("")
    topAppsSection = `<div class="topapps-section">
      <div class="section-mini-header">📊 Top Apps por Conexões</div>
      <div class="topapp-rows">${topRows}</div></div>`
  }

  // ── NOVO: ANÁLISE TEMPORAL ──────────────────────────────────────────────
  let temporalSection = ""
  if (temporalAnalysis && temporalAnalysis.totalMinutes > 0) {
    let spikeWarn = temporalAnalysis.spikes > 0
      ? `<span class="temp-spike">⚡ ${temporalAnalysis.spikes} pico${temporalAnalysis.spikes>1?"s":""} anômalo${temporalAnalysis.spikes>1?"s":""} detectado${temporalAnalysis.spikes>1?"s":""}</span>` : ""
    temporalSection = `<div class="temporal-section">
      <div class="section-mini-header">⏱ Análise Temporal</div>
      <div class="temporal-grid">
        <div class="temp-card"><div class="temp-label">Minutos monitorados</div><div class="temp-val">${temporalAnalysis.totalMinutes}</div></div>
        <div class="temp-card"><div class="temp-label">Média conexões/min</div><div class="temp-val">${temporalAnalysis.avgPerMinute}</div></div>
        ${spikeWarn ? `<div class="temp-card temp-card-warn"><div class="temp-label">Picos de tráfego</div><div class="temp-val" style="color:#ff8800">${temporalAnalysis.spikes}</div></div>` : ""}
      </div>
      ${spikeWarn ? `<div class="temporal-hint">⚡ Picos de tráfego ${temporalAnalysis.spikes>1?"indicam":"indica"} uso intenso atípico — possível cheat ativo durante sessão de jogo</div>` : ""}
    </div>`
  }

  // ── IP CARDS ──────────────────────────────────────────────────────────────
  let cards = ""
  if (findings.length === 0) {
    cards = `<div class="ok">✓ Nenhum IP VPS / Hosting / Proxy detectado.</div>`
  } else {
    for (let f of findings) {
      let tag = f.tldSuspect ? "DOMÍNIO SUSPEITO" : f.hosting ? "VPS/HOSTING" : f.proxy ? "PROXY/VPN" : "NUVEM"
      let cls = f.tldSuspect ? "tld-flag" : f.severity === "HIGH" ? "high" : "medium"
      let sev = f.tldSuspect ? "⚠ DOMÍNIO SUSPEITO" : f.severity === "HIGH" ? "SUSPEITO" : "POSSÍVEL"
      let bundleList = f.bundles.map(b => `<span class="bundle">${b}</span>`).join(" ")
      cards += `<div class="card ${cls}">
        <div class="card-header"><span class="badge ${cls}">${sev}</span><span class="conns">${f.hits} conexões</span></div>
        <div class="card-domain">${f.domain}</div>
        <div class="grid">
          <div class="row"><span class="label">IP</span><span class="val">${f.ip}</span></div>
          <div class="row"><span class="label">País</span><span class="val">${f.country} / ${f.city}</span></div>
          <div class="row"><span class="label">Provedor</span><span class="val isp">${f.isp}</span></div>
          <div class="row"><span class="label">Org</span><span class="val">${f.org}</span></div>
          ${f.reverse?`<div class="row"><span class="label">rDNS</span><span class="val rdns">${f.reverse}</span></div>`:""}
          ${f.probe?`<div class="row"><span class="label">HTTP</span><span class="val">${f.probe.online?`<span class="http-on">● Online</span>${f.probe.status?` — HTTP ${f.probe.status}`:""}${f.probe.banner?` — <span class="http-banner">${f.probe.banner}</span>`:""}` :`<span class="http-off">● Offline / Sem resposta</span>`}</span></div>`:""}
          <div class="row"><span class="label">Motivo</span><span class="val reason" data-reasons='${JSON.stringify(f.reasons)}'>${f.reasons.join("<br>")}</span></div>
          <div class="row"><span class="label">Usado por</span><span class="val">${bundleList}</span></div>
        </div></div>`
    }
  }

  let uptimeBg = uptimeWarning ? "background:linear-gradient(90deg,#1a0e00,#110800)" : "background:#050d16"
  let uptimeDotCl = uptimeWarning ? "background:#ff8800;box-shadow:0 0 8px #ff8800" : "background:#1e90ff;box-shadow:0 0 8px #1e90ff"
  let uptimeWarnBadge = uptimeWarning ? `<span class="uptime-warn-badge">⚠ MENOS DE 20MIN — Relatório pode não cobrir a partida inteira!</span>` : ""

  // ── SCORE VISUAL (NOVO) ─────────────────────────────────────────────────
  let riskScore = Math.min(100, criticalCount * 25 + highCount * 10 + medCount * 3)
  let riskLabel = riskScore >= 75 ? "ALTÍSSIMO" : riskScore >= 50 ? "ALTO" : riskScore >= 25 ? "MÉDIO" : riskScore > 0 ? "BAIXO" : "LIMPO"
  let riskColor = riskScore >= 75 ? "#ff2244" : riskScore >= 50 ? "#ff6600" : riskScore >= 25 ? "#ffbb00" : riskScore > 0 ? "#88cc00" : "#00cc66"
  let verdictEmoji = riskScore >= 50 ? "🚨" : riskScore >= 25 ? "⚠️" : "✅"

  return `<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta charset="utf-8">
<title>PantherSS — Anti-Cheat Report</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;900&family=JetBrains+Mono:wght@400;600&display=swap');

:root {
  --bg:       #050911;
  --bg2:      #080e1a;
  --bg3:      #0b1420;
  --border:   #0f2035;
  --blue:     #1e90ff;
  --blue-dim: #0a2a4a;
  --text:     #c8d8e8;
  --text-dim: #3a5a72;
  --critical: #ff1a4a;
  --high:     #ff4444;
  --medium:   #ffbb00;
  --panther:  #1e90ff;
}

* { box-sizing:border-box; margin:0; padding:0; }

body {
  background:var(--bg);
  color:var(--text);
  font-family:'JetBrains Mono', monospace;
  font-size:12px;
  min-height:100vh;
}

/* ── HERO ─────────────────────────────────────────────── */
.hero {
  position:relative; overflow:hidden;
  background:linear-gradient(170deg,#060e1e 0%,#020609 100%);
  border-bottom:1px solid #0f2035;
  padding:32px 16px 24px;
  text-align:center;
}
.hero-bg-stripes {
  position:absolute; inset:0; pointer-events:none;
  background:repeating-linear-gradient(135deg,transparent,transparent 30px,rgba(30,144,255,0.015) 30px,rgba(30,144,255,0.015) 31px);
}
.hero-glow {
  position:absolute; top:-80px; left:50%; transform:translateX(-50%);
  width:300px; height:300px;
  background:radial-gradient(circle,rgba(30,144,255,0.08) 0%,transparent 70%);
  pointer-events:none;
}
.panther-logo {
  width:90px; height:90px; border-radius:18px; margin:0 auto 14px;
  border:2px solid rgba(30,144,255,0.3);
  box-shadow:0 0 30px rgba(30,144,255,0.2), inset 0 0 20px rgba(0,0,0,0.5);
  object-fit:cover; display:block;
}
.hero-eyebrow {
  font-family:'Barlow Condensed',sans-serif;
  font-size:10px; letter-spacing:5px; color:rgba(30,144,255,0.5);
  text-transform:uppercase; margin-bottom:6px;
}
.hero-name {
  font-family:'Barlow Condensed',sans-serif;
  font-size:42px; font-weight:900; letter-spacing:-1px;
  color:#fff; line-height:1; margin-bottom:2px;
}
.hero-name span { color:var(--blue); }
.hero-sub {
  font-family:'Barlow Condensed',sans-serif;
  font-size:13px; letter-spacing:4px; color:var(--text-dim);
  text-transform:uppercase; margin-bottom:20px;
}
.hero-file {
  font-size:10px; color:var(--text-dim); word-break:break-all;
  padding:7px 12px; background:rgba(30,144,255,0.05);
  border-radius:8px; border:1px solid rgba(30,144,255,0.1);
  margin-bottom:16px; line-height:1.5; text-align:left;
}
.hero-file strong { color:rgba(30,144,255,0.7); }
.hero-grid { display:grid; grid-template-columns:1fr 1fr; gap:8px; }
.hg-card {
  background:rgba(30,144,255,0.04); border-radius:10px;
  padding:10px 12px; border:1px solid rgba(30,144,255,0.1);
}
.hg-label { font-size:9px; color:var(--text-dim); letter-spacing:1px; text-transform:uppercase; margin-bottom:4px; }
.hg-val       { font-size:13px; color:var(--text); }
.hg-val.blue  { color:var(--blue); font-weight:700; font-size:16px; }
.hg-val.warn  { color:#ff8800; font-weight:700; }
.hg-card-full { grid-column:1/-1; }
.hg-card-warn { background:rgba(255,136,0,0.06) !important; border-color:rgba(255,136,0,0.2) !important; }

/* ── VERDICT SCORE ────────────────────────────────────── */
.verdict-bar {
  background:var(--bg2); border-bottom:1px solid var(--border);
  padding:16px; display:flex; align-items:center; gap:14px;
}
.verdict-emoji { font-size:30px; flex-shrink:0; }
.verdict-info { flex:1; }
.verdict-label { font-size:9px; color:var(--text-dim); letter-spacing:2px; text-transform:uppercase; margin-bottom:4px; font-family:'Barlow Condensed',sans-serif; }
.verdict-text { font-family:'Barlow Condensed',sans-serif; font-size:20px; font-weight:700; }
.verdict-score-ring { position:relative; width:54px; height:54px; flex-shrink:0; }
.verdict-score-ring svg { transform:rotate(-90deg); }
.verdict-score-num {
  position:absolute; inset:0; display:flex; align-items:center; justify-content:center;
  font-family:'Barlow Condensed',sans-serif; font-size:14px; font-weight:900;
}

/* ── UPTIME BAR ───────────────────────────────────────── */
.uptime-bar {
  padding:10px 16px; display:flex; align-items:center; gap:8px; flex-wrap:wrap;
  border-bottom:1px solid var(--border);
}
.uptime-dot { width:8px; height:8px; border-radius:50%; flex-shrink:0; animation:pulse 2s infinite; }
@keyframes pulse { 0%,100%{opacity:1}50%{opacity:0.3} }
.uptime-text { font-size:11px; color:#556; }
.uptime-text strong { color:var(--text); }
.uptime-warn-badge {
  background:rgba(255,136,0,0.1); color:#ff8800;
  border:1px solid rgba(255,136,0,0.3); font-size:9px;
  padding:3px 8px; border-radius:10px; font-weight:700;
}

/* ── LANG BUTTONS ────────────────────────────────────── */
.lang-bar { display:flex; justify-content:center; gap:6px; margin-bottom:16px; }
.lang-btn {
  background:rgba(30,144,255,0.05); border:1px solid rgba(30,144,255,0.15);
  border-radius:20px; color:var(--text-dim); font-size:10px; letter-spacing:1px;
  padding:4px 12px; cursor:pointer; font-family:'JetBrains Mono',monospace;
  transition:all 0.2s; text-transform:uppercase; font-weight:600;
}
.lang-btn.active { background:rgba(30,144,255,0.15); border-color:var(--blue); color:var(--blue); }

/* ── CONTENT ─────────────────────────────────────────── */
.content { padding:16px; }

/* ── SUMMARY ─────────────────────────────────────────── */
.summary { display:flex; gap:8px; margin-bottom:20px; }
.stat {
  flex:1; background:var(--bg2); border-radius:12px;
  padding:14px 6px; text-align:center; border:1px solid var(--border);
}
.stat .num { font-family:'Barlow Condensed',sans-serif; font-size:32px; font-weight:900; line-height:1; }
.stat .lbl { font-size:9px; color:var(--text-dim); margin-top:3px; letter-spacing:1px; text-transform:uppercase; }

/* ── SECTION HEADERS ─────────────────────────────────── */
.section-header { display:flex; align-items:center; gap:10px; margin-bottom:12px; margin-top:4px; }
.sh-icon { width:34px; height:34px; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:16px; flex-shrink:0; }
.sh-text { flex:1; }
.sh-title { font-family:'Barlow Condensed',sans-serif; font-size:14px; font-weight:700; letter-spacing:0.5px; text-transform:uppercase; }
.sh-sub { font-size:10px; color:var(--text-dim); margin-top:1px; }
.sh-count { font-size:12px; font-weight:700; padding:3px 12px; border-radius:20px; font-family:'Barlow Condensed',sans-serif; }
.sh-critical .sh-icon { background:rgba(255,26,74,0.1); }
.sh-critical .sh-title { color:#ff1a4a; }
.sh-critical .sh-count { background:rgba(255,26,74,0.1); color:#ff1a4a; border:1px solid rgba(255,26,74,0.3); }
.sh-high .sh-icon { background:rgba(255,68,68,0.08); }
.sh-high .sh-title { color:#ff4444; }
.sh-high .sh-count { background:rgba(255,68,68,0.08); color:#ff4444; border:1px solid rgba(255,68,68,0.2); }
.sh-medium .sh-icon { background:rgba(255,187,0,0.08); }
.sh-medium .sh-title { color:#ffbb00; }
.sh-medium .sh-count { background:rgba(255,187,0,0.08); color:#ffbb00; border:1px solid rgba(255,187,0,0.2); }
.divider { height:1px; background:var(--border); margin:20px 0; }

/* ── CARDS ───────────────────────────────────────────── */
.card {
  background:var(--bg2); border-radius:12px; margin-bottom:10px;
  overflow:hidden; border:1px solid var(--border); border-left:4px solid #1a2a3a;
}
.card.critical { border-left-color:#ff1a4a; background:#0a0208; border-color:rgba(255,26,74,0.15); }
.card.tld-flag { border-left-color:#ff6600; background:#0c0800; border-color:rgba(255,102,0,0.15); }
.card.high     { border-left-color:#ff4444; border-color:rgba(255,68,68,0.15); }
.card.medium   { border-left-color:#ffbb00; border-color:rgba(255,187,0,0.1); }
.card-header { display:flex; justify-content:space-between; align-items:center; padding:10px 14px 6px; }
.badge { font-size:9px; font-weight:700; padding:3px 9px; border-radius:20px; letter-spacing:0.3px; font-family:'Barlow Condensed',sans-serif; font-size:11px; }
.badge.critical { background:rgba(255,26,74,0.12); color:#ff4477; border:1px solid rgba(255,26,74,0.3); }
.badge.tld-flag { background:rgba(255,102,0,0.1); color:#ff8844; border:1px solid rgba(255,102,0,0.3); }
.badge.high     { background:rgba(255,68,68,0.1);  color:#ff6666; border:1px solid rgba(255,68,68,0.3); }
.badge.medium   { background:rgba(255,187,0,0.08); color:#ffcc44; border:1px solid rgba(255,187,0,0.3); }
.conns { font-size:10px; color:var(--text-dim); }
.card-domain { font-size:13px; font-weight:600; color:#fff; padding:0 14px 10px; word-break:break-all; }
.grid { padding:0 14px 12px; }
.row { display:flex; gap:8px; padding:5px 0; border-top:1px solid rgba(15,32,53,0.8); align-items:flex-start; }
.label { color:var(--text-dim); min-width:65px; font-size:10px; padding-top:1px; flex-shrink:0; line-height:1.4; }
.sub   { color:#2a4060; font-size:9px; }
.val   { color:#a0b8cc; word-break:break-all; flex:1; font-size:11px; line-height:1.5; }
.isp   { color:#ffbb44; }
.reason { color:#ff8a80; }
.rdns  { color:#c792ea; font-style:italic; }
.http-on { color:#44cc88; font-weight:700; }
.http-off { color:#2a4060; font-weight:700; }
.http-banner { color:#ff60a0; font-weight:700; text-transform:uppercase; font-size:10px; }
.none { color:var(--text-dim); }
.bundle {
  display:inline-block; background:rgba(30,144,255,0.04); border-radius:5px;
  padding:2px 6px; font-size:9px; color:var(--text-dim); margin:1px;
  word-break:break-all; border:1px solid rgba(30,144,255,0.1);
}
.domain-row { padding:3px 0; font-size:11px; color:#a0b8cc; word-break:break-all; }
.domain-badge { display:inline-block; font-size:9px; font-weight:700; padding:1px 5px; border-radius:4px; margin-right:4px; vertical-align:middle; font-family:'Barlow Condensed',sans-serif; }
.domain-badge.high   { background:rgba(255,68,68,0.1);  color:#ff6666; }
.domain-badge.medium { background:rgba(255,187,0,0.08); color:#ffcc44; }
.ok { background:rgba(0,204,102,0.05); border:1px solid rgba(0,204,102,0.15); color:#00cc66; padding:20px; border-radius:12px; text-align:center; font-family:'Barlow Condensed',sans-serif; font-size:16px; }

/* ── BANNERS ─────────────────────────────────────────── */
.appstore-banner, .ff-banner, .stale-banner, .roots-banner {
  display:flex; align-items:flex-start; gap:14px;
  border-radius:12px; padding:14px 16px; margin-bottom:14px;
}
.appstore-banner { background:linear-gradient(135deg,#1a1600,#201c00); border:1px solid rgba(180,140,0,0.3); }
.appstore-left { font-size:28px; flex-shrink:0; }
.appstore-label { font-family:'Barlow Condensed',sans-serif; font-size:9px; color:#aa9900; letter-spacing:2px; text-transform:uppercase; font-weight:700; }
.appstore-time  { font-family:'Barlow Condensed',sans-serif; font-size:20px; font-weight:700; color:#ffd700; margin:3px 0; }
.appstore-hint  { font-size:10px; color:#6a5700; }
.ff-banner { background:linear-gradient(135deg,#041a00,#061200); border:1px solid rgba(30,180,0,0.2); }
.ff-left  { font-size:28px; flex-shrink:0; margin-top:2px; }
.ff-info  { flex:1; }
.ff-label { font-family:'Barlow Condensed',sans-serif; font-size:9px; color:#4a9900; letter-spacing:2px; text-transform:uppercase; font-weight:700; margin-bottom:6px; }
.ff-session-row { display:flex; align-items:center; justify-content:space-between; gap:8px; padding:5px 0; border-top:1px solid rgba(20,60,0,0.8); }
.ff-session-row:first-of-type { border-top:none; }
.ff-session-left { display:flex; flex-direction:column; gap:1px; }
.ff-session-num  { font-size:9px; color:var(--text-dim); text-transform:uppercase; letter-spacing:0.5px; }
.ff-session-ts   { font-family:'Barlow Condensed',sans-serif; font-size:15px; font-weight:700; color:#88ff44; }
.ff-login-badge  { font-size:9px; font-weight:700; padding:3px 8px; border-radius:10px; white-space:nowrap; flex-shrink:0; font-family:'Barlow Condensed',sans-serif; }
.ff-sessions { font-size:10px; color:#3a6600; margin-top:6px; }
.ff-hint  { font-size:10px; color:#4a7700; margin-top:3px; }
.stale-banner { background:linear-gradient(135deg,#1a1000,#221600); border:1px solid rgba(180,100,0,0.3); }
.stale-left  { font-size:26px; flex-shrink:0; margin-top:2px; }
.stale-label { font-family:'Barlow Condensed',sans-serif; font-size:9px; color:#aa7700; letter-spacing:2px; text-transform:uppercase; font-weight:700; }
.stale-time  { font-family:'Barlow Condensed',sans-serif; font-size:16px; color:#ffaa00; margin:3px 0; }
.stale-time strong { color:#ffd000; }
.stale-hint  { font-size:10px; color:#7a5500; line-height:1.4; }
.roots-banner { background:linear-gradient(135deg,#1a0a00,#120800); border:1px solid rgba(255,100,0,0.3); }
.roots-icon  { font-size:22px; flex-shrink:0; }
.roots-label { font-family:'Barlow Condensed',sans-serif; font-size:12px; font-weight:700; color:#ff8800; letter-spacing:0.5px; margin-bottom:3px; }
.roots-detail{ font-family:'Barlow Condensed',sans-serif; font-size:15px; color:#ffaa44; font-weight:700; margin-bottom:4px; }
.roots-hint  { font-size:10px; color:#885500; line-height:1.4; }

/* ── GHOST ───────────────────────────────────────────── */
.ghost-banner { background:linear-gradient(135deg,#070714,#060610); border:1px solid rgba(50,60,160,0.3); border-radius:12px; padding:14px; margin-bottom:12px; }
.ghost-header { display:flex; align-items:flex-start; gap:10px; margin-bottom:12px; }
.ghost-icon  { font-size:20px; flex-shrink:0; }
.ghost-title-block { flex:1; }
.ghost-title { font-family:'Barlow Condensed',sans-serif; font-size:13px; font-weight:700; color:#7788ff; letter-spacing:0.5px; }
.ghost-sub   { font-size:10px; color:#2a3460; margin-top:2px; }
.ghost-count { background:#0a0a2a; color:#5566dd; font-family:'Barlow Condensed',sans-serif; font-size:13px; font-weight:700; padding:2px 10px; border-radius:10px; border:1px solid rgba(50,60,160,0.3); align-self:flex-start; }
.ghost-rows  { display:flex; flex-direction:column; gap:8px; margin-bottom:10px; }
.ghost-row   { display:flex; justify-content:space-between; align-items:flex-start; gap:8px; background:rgba(10,10,30,0.6); border:1px solid rgba(30,30,80,0.6); border-radius:8px; padding:10px; }
.ghost-row-left  { flex:1; min-width:0; display:flex; flex-direction:column; gap:4px; }
.ghost-row-right { display:flex; flex-direction:column; align-items:flex-end; gap:4px; flex-shrink:0; }
.ghost-bundle { font-size:11px; font-weight:600; color:#9aabff; word-break:break-all; }
.ghost-domains { display:flex; flex-wrap:wrap; gap:4px; }
.ghost-domain { font-size:9px; background:rgba(10,10,40,0.8); color:#5566cc; border:1px solid rgba(30,30,80,0.6); padding:1px 6px; border-radius:8px; }
.ghost-more  { font-size:9px; color:var(--text-dim); }
.ghost-hits  { font-family:'Barlow Condensed',sans-serif; font-size:13px; font-weight:700; color:#5566dd; }
.ghost-label { font-size:9px; color:#2a3460; background:rgba(10,10,30,0.6); padding:2px 6px; border-radius:6px; border:1px solid rgba(30,30,80,0.4); }
.ghost-hint  { font-size:9px; color:#2a3460; border-top:1px solid rgba(20,20,60,0.6); padding-top:8px; }

/* ── IPS ─────────────────────────────────────────────── */
.ips-banner { background:linear-gradient(135deg,#120010,#0e000a); border:1px solid rgba(180,0,100,0.2); border-radius:12px; padding:14px; margin-bottom:12px; }
.ips-header { display:flex; align-items:center; gap:10px; margin-bottom:12px; }
.ips-icon   { font-size:22px; flex-shrink:0; }
.ips-header-text { flex:1; }
.ips-title  { font-family:'Barlow Condensed',sans-serif; font-size:13px; font-weight:700; color:#dd44ff; letter-spacing:0.5px; }
.ips-sub    { font-size:10px; color:#4a1060; margin-top:1px; }
.ips-count  { background:rgba(180,0,120,0.1); color:#dd44ff; border:1px solid rgba(180,0,120,0.3); font-family:'Barlow Condensed',sans-serif; font-size:16px; font-weight:700; padding:4px 12px; border-radius:20px; }
.ips-rows   { display:flex; flex-direction:column; gap:8px; margin-bottom:10px; }
.ips-row { display:flex; justify-content:space-between; align-items:flex-start; gap:8px; border-radius:8px; padding:8px 10px; border:1px solid transparent; }
.ips-row-critical { background:rgba(20,0,12,0.8); border-color:rgba(255,0,80,0.2); }
.ips-row-vpn      { background:rgba(5,5,25,0.8);  border-color:rgba(40,60,200,0.2); }
.ips-row-developer{ background:rgba(0,20,5,0.8);  border-color:rgba(40,180,60,0.2); }
.ips-row-warning  { background:rgba(20,10,0,0.8); border-color:rgba(200,100,0,0.2); }
.ips-row-top { margin-bottom:4px; }
.ips-cat-badge { display:inline-block; font-size:9px; font-weight:700; padding:2px 8px; border-radius:10px; letter-spacing:0.3px; font-family:'Barlow Condensed',sans-serif; font-size:10px; }
.ips-cat-critical  { background:rgba(255,0,60,0.1);  color:#ff3366; border:1px solid rgba(255,0,60,0.2); }
.ips-cat-vpn       { background:rgba(40,60,255,0.08); color:#5577ff; border:1px solid rgba(40,60,255,0.2); }
.ips-cat-developer { background:rgba(40,200,60,0.06); color:#44cc44; border:1px solid rgba(40,200,60,0.2); }
.ips-cat-warning   { background:rgba(200,100,0,0.08); color:#ff8800; border:1px solid rgba(200,100,0,0.2); }
.ips-row-left  { display:flex; flex-direction:column; gap:2px; flex:1; min-width:0; }
.ips-row-right { display:flex; flex-direction:column; align-items:flex-end; gap:4px; flex-shrink:0; }
.ips-bundle { font-size:11px; font-weight:600; color:#cc88ff; word-break:break-all; }
.ips-reason { font-size:10px; color:#6a4480; line-height:1.4; }
.ips-version { font-size:9px; color:#3a2040; }
.ips-badge { font-size:9px; font-weight:700; padding:2px 7px; border-radius:10px; font-family:'Barlow Condensed',sans-serif; font-size:10px; }
.ips-badge.launched  { background:rgba(150,40,255,0.1); color:#aa44ff; border:1px solid rgba(150,40,255,0.2); }
.ips-badge.installed { background:rgba(40,200,60,0.06); color:#44aa44; border:1px solid rgba(40,200,60,0.2); }
.ips-hint { font-size:9px; color:#3a1060; line-height:1.4; }

/* ── TEMPORAL ────────────────────────────────────────── */
.section-mini-header {
  font-family:'Barlow Condensed',sans-serif; font-size:12px; font-weight:700;
  letter-spacing:1px; color:var(--text-dim); text-transform:uppercase;
  margin-bottom:10px; padding-bottom:6px; border-bottom:1px solid var(--border);
}
.temporal-section, .topapps-section { background:var(--bg2); border:1px solid var(--border); border-radius:12px; padding:14px; margin-bottom:14px; }
.temporal-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:8px; margin-bottom:8px; }
.temp-card { background:rgba(30,144,255,0.04); border:1px solid rgba(30,144,255,0.08); border-radius:8px; padding:8px 10px; }
.temp-card-warn { background:rgba(255,136,0,0.06) !important; border-color:rgba(255,136,0,0.2) !important; }
.temp-label { font-size:9px; color:var(--text-dim); text-transform:uppercase; letter-spacing:0.5px; margin-bottom:3px; }
.temp-val   { font-family:'Barlow Condensed',sans-serif; font-size:18px; font-weight:700; color:var(--blue); }
.temp-spike { display:inline-block; font-size:9px; color:#ff8800; background:rgba(255,136,0,0.08); border:1px solid rgba(255,136,0,0.2); padding:2px 8px; border-radius:10px; }
.temporal-hint { font-size:10px; color:#6a4a00; margin-top:8px; line-height:1.4; }

/* ── TOP APPS ────────────────────────────────────────── */
.topapp-rows { display:flex; flex-direction:column; gap:6px; }
.topapp-row  { display:flex; align-items:center; gap:10px; }
.topapp-num  { font-family:'Barlow Condensed',sans-serif; font-size:13px; font-weight:700; width:24px; flex-shrink:0; }
.topapp-info { flex:1; min-width:0; }
.topapp-bid  { font-size:10px; word-break:break-all; margin-bottom:3px; }
.topapp-suspect { font-family:'Barlow Condensed',sans-serif; font-size:10px; color:#ff6666; background:rgba(255,68,68,0.08); border:1px solid rgba(255,68,68,0.2); padding:1px 5px; border-radius:4px; }
.topapp-bar  { height:3px; background:rgba(30,144,255,0.08); border-radius:2px; overflow:hidden; }
.topapp-fill { height:100%; border-radius:2px; }
.topapp-hits { font-family:'Barlow Condensed',sans-serif; font-size:12px; font-weight:700; color:var(--text-dim); width:50px; text-align:right; flex-shrink:0; }
</style>
</head>
<body>

<div class="hero">
  <div class="hero-bg-stripes"></div>
  <div class="hero-glow"></div>
  <div class="hero-eyebrow">Anti-Cheat Scanner · iOS</div>
  <div class="hero-name">PANTHER<span>SS</span></div>
  <div class="hero-sub">Panther Apostas · Free Fire</div>
  <div class="lang-bar">
    <button class="lang-btn active" id="btn-pt">PT-BR</button>
    <button class="lang-btn" id="btn-en">EN</button>
    <button class="lang-btn" id="btn-es">ES</button>
  </div>
  <div class="hero-file"><strong>Arquivo:</strong> ${filename}</div>
  <div class="hero-grid">
    <div class="hg-card"><div class="hg-label">Início</div><div class="hg-val">${fmtDt(firstTs)}</div></div>
    <div class="hg-card"><div class="hg-label">Último registro</div><div class="hg-val">${fmtDt(lastTs)}</div></div>
    <div class="hg-card"><div class="hg-label">Domínios únicos</div><div class="hg-val blue">${allDomains ? allDomains.length : 0}</div></div>
    <div class="hg-card"><div class="hg-label">Total conexões</div><div class="hg-val">${netEntries.length}</div></div>
    ${ipsMeta && ipsMeta.iosVersion ? `<div class="hg-card${ipsMeta.rootsInstalled > 0 ? "" : " hg-card-full"}"><div class="hg-label">Versão iOS</div><div class="hg-val blue">${ipsMeta.iosVersion}</div></div>` : ""}
    ${ipsMeta && ipsMeta.rootsInstalled > 0 ? `<div class="hg-card hg-card-warn"><div class="hg-label">⚠ Certificados raiz</div><div class="hg-val warn">${ipsMeta.rootsInstalled} instalado${ipsMeta.rootsInstalled>1?"s":""}</div></div>` : ""}
  </div>
</div>

<div class="verdict-bar">
  <div class="verdict-emoji">${verdictEmoji}</div>
  <div class="verdict-info">
    <div class="verdict-label">Nível de risco</div>
    <div class="verdict-text" style="color:${riskColor}">${riskLabel}</div>
  </div>
  <div class="verdict-score-ring">
    <svg width="54" height="54" viewBox="0 0 54 54">
      <circle cx="27" cy="27" r="22" fill="none" stroke="rgba(30,144,255,0.08)" stroke-width="5"/>
      <circle cx="27" cy="27" r="22" fill="none" stroke="${riskColor}" stroke-width="5"
        stroke-dasharray="${Math.round(2*3.14159*22)}"
        stroke-dashoffset="${Math.round(2*3.14159*22*(1-riskScore/100))}"
        stroke-linecap="round"/>
    </svg>
    <div class="verdict-score-num" style="color:${riskColor}">${riskScore}</div>
  </div>
</div>

<div class="uptime-bar" style="${uptimeBg}">
  <div class="uptime-dot" style="${uptimeDotCl}"></div>
  <div class="uptime-text">Monitorado há <strong>${uptimeStr}</strong></div>
  ${uptimeWarnBadge}
</div>

<div class="content">
  ${staleBanner}
  ${ffBanner}
  ${appStoreBanner}

  <div class="summary">
    <div class="stat"><div class="num" style="color:#ff1a4a">${criticalCount}</div><div class="lbl">Crítico</div></div>
    <div class="stat"><div class="num" style="color:#ff4444">${highCount}</div><div class="lbl">Suspeito</div></div>
    <div class="stat"><div class="num" style="color:#ffbb00">${medCount}</div><div class="lbl">Possível</div></div>
  </div>

  ${temporalSection}
  ${topAppsSection}

  ${criticalCount > 0 ? `
  <div class="section-header sh-critical">
    <div class="sh-icon">⚠</div>
    <div class="sh-text"><div class="sh-title">Apps Proxy / Cheat Detectados</div><div class="sh-sub">Aplicativos e infraestrutura conhecida de cheats</div></div>
    <div class="sh-count">${criticalCount}</div>
  </div>
  ${criticalCards}
  <div class="divider"></div>` : ""}

  ${highCount > 0 ? `
  ${rootsWarn}
  ${ipsSection}
  ${ghostSection}
  <div class="section-header sh-high">
    <div class="sh-icon">🚫</div>
    <div class="sh-text"><div class="sh-title">IPs Suspeitos</div><div class="sh-sub">VPS / Hosting / Proxy confirmados</div></div>
    <div class="sh-count">${highCount}</div>
  </div>` : `${ipsSection}${ghostSection}`}

  ${medCount > 0 && highCount === 0 ? `
  <div class="section-header sh-medium">
    <div class="sh-icon">⚠</div>
    <div class="sh-text"><div class="sh-title">IPs Possíveis</div><div class="sh-sub">Infraestrutura cloud / datacenter</div></div>
    <div class="sh-count">${medCount}</div>
  </div>` : ""}

  ${cards}

  ${findings.length > 0 && highCount > 0 && medCount > 0 ? `
  <div class="divider"></div>
  <div class="section-header sh-medium">
    <div class="sh-icon">⚠</div>
    <div class="sh-text"><div class="sh-title">IPs Possíveis</div><div class="sh-sub">Infraestrutura cloud / datacenter</div></div>
    <div class="sh-count">${medCount}</div>
  </div>` : ""}

</div>

<script>
(function(){
var TRANSLATIONS={pt:{criticalLabel:"Crítico",suspectLabel:"Suspeito",possibleLabel:"Possível",monitoredFor:"Monitorado há",appProxyTitle:"Apps Proxy / Cheat Detectados",appProxySub:"Aplicativos e infraestrutura conhecida de cheats",suspectIPsTitle:"IPs Suspeitos",suspectIPsSub:"VPS / Hosting / Proxy confirmados",possibleIPsTitle:"IPs Possíveis",possibleIPsSub:"Infraestrutura cloud / datacenter",noVPS:"✓ Nenhum IP VPS / Hosting / Proxy detectado.",badgeSuspect:"SUSPEITO",badgePossible:"POSSÍVEL",badgeDomainSuspect:"⚠ DOMÍNIO SUSPEITO",badgeCritical:"⚠ CRÍTICO — APP PROXY/CHEAT",badgeKnownCheat:"⚠ CRÍTICO — CHEAT CONFIRMADO",conns:"conexões",online:"● Online",offline:"● Offline / Sem resposta",staleLabel:"Arquivo possivelmente antigo",staleHint:"Suspeita: arquivo gerado fora do período da partida para esconder atividade.",ffLabel:"Sessões no período",ffSessions:"inicializações registradas no período",ffHint:"Se a última abertura foi após a partida → aplique o W.O!",appStoreLabel:"App Store aberta",appStoreHint:"Se foi após a partida → aplique o W.O!",uptimeLess20:"MENOS DE 20MIN — Relatório pode não cobrir a partida inteira!",riskLevel:"Nível de risco"},en:{criticalLabel:"Critical",suspectLabel:"Suspicious",possibleLabel:"Possible",monitoredFor:"Monitored for",appProxyTitle:"Proxy / Cheat Apps Detected",appProxySub:"Known cheat applications and infrastructure",suspectIPsTitle:"Suspicious IPs",suspectIPsSub:"VPS / Hosting / Confirmed Proxy",possibleIPsTitle:"Possible IPs",possibleIPsSub:"Cloud / datacenter infrastructure",noVPS:"✓ No VPS / Hosting / Proxy IPs detected.",badgeSuspect:"SUSPICIOUS",badgePossible:"POSSIBLE",badgeDomainSuspect:"⚠ SUSPICIOUS DOMAIN",badgeCritical:"⚠ CRITICAL — PROXY/CHEAT APP",badgeKnownCheat:"⚠ CRITICAL — CONFIRMED CHEAT",conns:"connections",online:"● Online",offline:"● Offline / No response",staleLabel:"File possibly outdated",staleHint:"Suspicion: file generated outside the match period to hide activity.",ffLabel:"Sessions in period",ffSessions:"startups recorded in the period",ffHint:"If last opened after the match → apply W.O!",appStoreLabel:"App Store opened",appStoreHint:"If it was after the match → apply W.O!",uptimeLess20:"LESS THAN 20MIN — Report may not cover the entire match!",riskLevel:"Risk level"},es:{criticalLabel:"Crítico",suspectLabel:"Sospechoso",possibleLabel:"Posible",monitoredFor:"Monitoreado hace",appProxyTitle:"Apps Proxy / Cheat Detectadas",appProxySub:"Aplicaciones y cheats conocidas",suspectIPsTitle:"IPs Sospechosas",suspectIPsSub:"VPS / Hosting / Proxy confirmados",possibleIPsTitle:"IPs Posibles",possibleIPsSub:"Infraestructura cloud / datacenter",noVPS:"✓ Ninguna IP VPS / Hosting / Proxy detectada.",badgeSuspect:"SOSPECHOSO",badgePossible:"POSIBLE",badgeDomainSuspect:"⚠ DOMINIO SOSPECHOSO",badgeCritical:"⚠ CRÍTICO — APP PROXY/CHEAT",badgeKnownCheat:"⚠ CRÍTICO — CHEAT CONFIRMADO",conns:"conexiones",online:"● En línea",offline:"● Sin conexión / Sin respuesta",staleLabel:"Archivo posiblemente antiguo",staleHint:"Sospecha: archivo generado fuera del período del partido para ocultar actividad.",ffLabel:"Sesiones en el período",ffSessions:"inicializaciones registradas en el período",ffHint:"Si la última apertura fue después del partido → ¡aplica el W.O!",appStoreLabel:"App Store abierta",appStoreHint:"Si fue después del partido → ¡aplica el W.O!",uptimeLess20:"MENOS DE 20MIN — ¡El informe puede no cubrir toda la partida!",riskLevel:"Nivel de riesgo"}};
function q(sel){return Array.from(document.querySelectorAll(sel))}
function setLang(lang){
  var t=TRANSLATIONS[lang];if(!t)return;
  ['pt','en','es'].forEach(function(l){var b=document.getElementById('btn-'+l);if(b)b.classList.toggle('active',l===lang)});
  q('.stat .lbl').forEach(function(el,i){var k=['criticalLabel','suspectLabel','possibleLabel'][i];if(k&&t[k])el.textContent=t[k]});
  q('.uptime-text').forEach(function(el){var s=el.querySelector('strong');if(s){var v=s.textContent;el.innerHTML=t.monitoredFor+' <strong>'+v+'</strong>'}});
  q('.uptime-warn-badge').forEach(function(el){el.textContent='⚠ '+t.uptimeLess20});
  q('.ok').forEach(function(el){el.textContent=t.noVPS});
  q('.stale-label').forEach(function(el){el.textContent=t.staleLabel});
  q('.stale-hint').forEach(function(el){el.textContent=t.staleHint});
  q('.ff-label').forEach(function(el){var v=el.textContent.indexOf('MAX')!==-1?'Free Fire MAX':'Free Fire';el.textContent=v+' — '+t.ffLabel});
  q('.ff-sessions').forEach(function(el){var n=el.textContent.match(/\d+/);if(n)el.textContent=n[0]+' '+t.ffSessions});
  q('.ff-hint').forEach(function(el){el.textContent=t.ffHint});
  q('.appstore-label').forEach(function(el){el.textContent=t.appStoreLabel});
  q('.appstore-hint').forEach(function(el){el.textContent=t.appStoreHint});
  q('.verdict-label').forEach(function(el){el.textContent=t.riskLevel});
  q('.section-header').forEach(function(sh){var tt=sh.querySelector('.sh-title'),sb=sh.querySelector('.sh-sub');if(!tt)return;if(sh.classList.contains('sh-critical')){tt.textContent=t.appProxyTitle;if(sb)sb.textContent=t.appProxySub}else if(sh.classList.contains('sh-high')){tt.textContent=t.suspectIPsTitle;if(sb)sb.textContent=t.suspectIPsSub}else if(sh.classList.contains('sh-medium')){tt.textContent=t.possibleIPsTitle;if(sb)sb.textContent=t.possibleIPsSub}});
  q('.card').forEach(function(card){
    var badge=card.querySelector('.badge');var connsEl=card.querySelector('.conns');
    if(connsEl){var n=connsEl.textContent.match(/\d+/);if(n)connsEl.textContent=n[0]+' '+t.conns}
    if(badge){if(badge.classList.contains('critical'))badge.innerHTML=badge.getAttribute('data-badge-type')==='known-cheat'?t.badgeKnownCheat:t.badgeCritical;else if(badge.classList.contains('tld-flag'))badge.innerHTML=t.badgeDomainSuspect;else if(badge.classList.contains('high'))badge.textContent=t.badgeSuspect;else if(badge.classList.contains('medium'))badge.textContent=t.badgePossible}
    q('.val').forEach(function(el){if(el.textContent.indexOf('Online')!==-1||el.textContent.indexOf('Offline')!==-1||el.textContent.indexOf('línea')!==-1){el.innerHTML=el.innerHTML.replace(/●\s*(En línea|Online)/g,t.online).replace(/●\s*(Sin conexión[^<]*|Offline[^<]*)/g,t.offline)}});
  });
}
window.setLang=setLang;
function bindBtns(){['pt','en','es'].forEach(function(l){var b=document.getElementById('btn-'+l);if(b)b.addEventListener('click',function(e){e.preventDefault();setLang(l)})})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bindBtns);else bindBtns();
})();
</script>
</body>
</html>`
}

// ─── FILE READING ────────────────────────────────────────────────────────────

async function readFile(path) {
  let content = null
  let fm = FileManager.iCloud()
  try {
    if (fm.isFileStoredIniCloud && fm.isFileStoredIniCloud(path)) await fm.downloadFileFromiCloud(path)
    content = fm.readString(path)
  } catch(e) {}
  if (!content) { try { content = FileManager.local().readString(path) } catch(e2) {} }
  return content
}

// ─── SHOW RESULT ─────────────────────────────────────────────────────────────

async function showResult(html) {
  let wv = new WebView()
  await wv.loadHTML(html, "http://localhost")
  Speech.speak(S.done)
  await wait(1200)
  await wv.present(false)
}

// ─── MAIN ────────────────────────────────────────────────────────────────────

async function main() {
  let step1 = new Alert()
  step1.title = "🐆 PantherSS — Passo 1 de 3"
  step1.message = "RELATÓRIO DE PRIVACIDADE\n\nVá em:\nAjustes → Privacidade e Segurança → Relatório de Privacidade de Apps\n\nRole até o final e toque em\n\"Ativar Relatório de Privacidade de Apps\"\n\nDepois toque em\n\"Exportar Relatório de Privacidade de Apps\"\ne salve o arquivo .ndjson."
  step1.addAction("Entendido →")
  step1.addCancelAction("Cancelar")
  if (await step1.present() === -1) { Script.complete(); return }

  let step2 = new Alert()
  step2.title = "🐆 PantherSS — Passo 2 de 3"
  step2.message = "DADOS DE ANÁLISE\n\nVá em:\nAjustes → Privacidade e Segurança → Análise e Melhorias\n\nAtive:\n• Compartilhar análise do iPhone\n• Compartilhar análise do iCloud\n• Compartilhar com desenvolvedores\n\nDepois em:\nDados de Análise → Selecione o mais recente\n\"xp_amp_app_usage_dnu...\"\n\nToque no arquivo → compartilhar → Salvar em Arquivos."
  step2.addAction("Entendido →")
  step2.addCancelAction("Cancelar")
  if (await step2.present() === -1) { Script.complete(); return }

  let step3 = new Alert()
  step3.title = "🐆 PantherSS — Passo 3 de 3"
  step3.message = "SELECIONAR ARQUIVOS\n\nSelecione os 2 arquivos salvos (qualquer ordem — o sistema identifica automaticamente):\n\n📋 App_Privacy_Report.ndjson\n📊 xp_amp_app_usage_dnu*.ips"
  step3.addAction("Selecionar arquivo 1")
  step3.addCancelAction("Cancelar")
  if (await step3.present() === -1) { Script.complete(); return }

  let path1 = await DocumentPicker.openFile()
  if (!path1) { Script.complete(); return }
  let content1 = await readFile(path1)
  if (!content1) {
    let a = new Alert(); a.title = "Erro"; a.message = "Não foi possível ler o arquivo 1."; a.addAction("OK"); await a.present(); return
  }

  let notice2 = new Alert()
  notice2.title = "Arquivo 2"
  notice2.message = "Selecione o segundo arquivo (ou pule para analisar somente o primeiro)."
  notice2.addAction("Selecionar arquivo 2")
  notice2.addCancelAction("Pular")
  let path2 = null, content2 = null
  if (await notice2.present() !== -1) {
    path2 = await DocumentPicker.openFile()
    if (path2) content2 = await readFile(path2)
  }

  function classifyContent(content, path) {
    if (looksLikePrivacyReport(content)) return "ndjson"
    if (looksLikeUsageFile(content)) return "ips"
    let name = (path || "").split("/").pop().toLowerCase()
    if (name.endsWith(".ndjson") || name.includes("privacy")) return "ndjson"
    if (name.endsWith(".ips") || name.includes("xp_amp")) return "ips"
    return "unknown"
  }

  let type1 = classifyContent(content1, path1)
  let type2 = content2 ? classifyContent(content2, path2) : null

  if (type2 && type1 === type2) {
    let a = new Alert()
    a.title = "Arquivos do mesmo tipo"
    a.message = type1 === "ndjson"
      ? "Os 2 arquivos parecem ser App Privacy Reports. O segundo deve ser o xp_amp_app_usage_dnu*.ips."
      : "Os 2 arquivos parecem ser dados de análise. O primeiro deve ser o App_Privacy_Report.ndjson."
    a.addAction("OK"); await a.present(); return
  }

  let ndjsonContent = null, ndjsonPath = null, ipsContent = null
  if (type1 === "ndjson" || type2 === "ips") {
    ndjsonContent = content1; ndjsonPath = path1; ipsContent = content2
  } else if (type1 === "ips" || type2 === "ndjson") {
    ipsContent = content1; ndjsonContent = content2; ndjsonPath = path2
  } else {
    let a = new Alert()
    a.title = "Arquivo não reconhecido"
    a.message = "Não foi possível identificar o tipo dos arquivos.\n\nVerifique se selecionou:\n• App_Privacy_Report.ndjson\n• xp_amp_app_usage_dnu*.ips"
    a.addAction("OK"); await a.present(); return
  }

  if (!ndjsonContent) {
    let a = new Alert()
    a.title = "App Privacy Report ausente"
    a.message = "O arquivo App_Privacy_Report.ndjson é obrigatório.\n\nAjustes → Privacidade → Relatório de Privacidade de Apps → Exportar"
    a.addAction("OK"); await a.present(); return
  }

  let entries = parseNdjson(ndjsonContent)
  let validation = validateReport(entries)
  if (!validation.ok) {
    let a = new Alert()
    a.title = "App Privacy Report inválido"
    a.message = validation.reason + "\n\nExporte em: Ajustes → Privacidade → Relatório de Privacidade de Apps → Exportar"
    a.addAction("OK"); await a.present(); return
  }

  let ipsFindings = [], ipsMeta = { iosVersion: null, rootsInstalled: 0 }
  if (ipsContent) {
    let parsed = parseIpsFile(ipsContent)
    ipsFindings = analyzeIps(parsed)
    if (parsed.header) {
      let osMatch = (parsed.header.os_version || "").match(/iPhone OS ([\d.]+)/)
      ipsMeta.iosVersion = osMatch ? osMatch[1] : parsed.header.os_version || null
      ipsMeta.rootsInstalled = parsed.header.roots_installed || 0
    }
  }

  let filename = (ndjsonPath || "arquivo").split("/").pop()
  Speech.speak(S.start)

  let { findings, netEntries, cheatAppFindings, knownCheatFindings, ghostAppFindings, proxyLoginFindings, temporalAnalysis, topApps, allDomains } = await analyze(entries)

  let html = buildHTML(findings, netEntries, cheatAppFindings, knownCheatFindings, ipsFindings, ipsMeta, ghostAppFindings, proxyLoginFindings, temporalAnalysis, topApps, allDomains, filename)
  await showResult(html)
}

await main()

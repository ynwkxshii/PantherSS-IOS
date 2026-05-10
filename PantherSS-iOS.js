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

// ─── MÓDULO 1: IP vs LOCALIZAÇÃO ────────────────────────────────────────────
// Compara a região geográfica dos IPs em networkActivity com coordenadas
// de entradas category:location no mesmo intervalo de ±5 minutos.

function analyzeIPvsLocation(entries, ipLookupMap) {
  const WINDOW_MS = 5 * 60 * 1000 // ±5 minutos

  // Coleta entradas de acesso a localização (category: location)
  let locationAccesses = entries.filter(e =>
    e.type === "access" &&
    e.category === "location" &&
    e.timeStamp
  ).map(e => ({
    ts: new Date(e.timeStamp).getTime(),
    bundleID: e.accessor && e.accessor.identifier ? e.accessor.identifier : (e.bundleID || "?"),
    timeStamp: e.timeStamp,
  }))

  if (locationAccesses.length === 0) return []

  // Coleta entradas de rede com IP resolvido
  let netEntries = entries.filter(e =>
    e.type === "networkActivity" && e.timeStamp && e.domain
  )

  let conflicts = []

  for (let locEntry of locationAccesses) {
    // Busca conexões de rede dentro da janela de ±5min
    let nearbyNet = netEntries.filter(e => {
      let diff = Math.abs(new Date(e.timeStamp).getTime() - locEntry.ts)
      return diff <= WINDOW_MS
    })

    for (let netEntry of nearbyNet) {
      let domain = netEntry.domain || ""
      let ipInfo = ipLookupMap && ipLookupMap[domain]
      if (!ipInfo || ipInfo.status !== "success") continue

      // País/região do IP resolvido
      let ipCountry  = (ipInfo.country || "").trim()
      let ipCity     = (ipInfo.city    || "").trim()
      let ipLat      = ipInfo.lat  || null
      let ipLon      = ipInfo.lon  || null

      // Sinaliza quando o IP é de datacenter/hosting ativo durante acesso a localização
      let isHosting = ipInfo.hosting || ipInfo.proxy
      let asnKey    = ((ipInfo.as || "").split(" ")[0] || "").toUpperCase()
      let isCheatASN = !!CHEAT_PROXY_ASN[asnKey]

      if (!isHosting && !isCheatASN) continue

      // Evita duplicatas por (bundleID + domínio)
      let key = `${locEntry.bundleID}||${domain}`
      if (conflicts.some(c => c._key === key)) continue

      conflicts.push({
        _key:          key,
        bundleID:      locEntry.bundleID,
        locationTs:    locEntry.timeStamp,
        networkTs:     netEntry.timeStamp,
        domain,
        ipCountry,
        ipCity,
        ipLat,
        ipLon,
        isp:           ipInfo.isp   || "?",
        asn:           ipInfo.as    || "?",
        isHosting,
        isCheatASN,
        asnLabel:      CHEAT_PROXY_ASN[asnKey] || null,
        hits:          netEntry.hits || 1,
        diffMinutes:   Math.round(Math.abs(new Date(netEntry.timeStamp).getTime() - locEntry.ts) / 60000),
      })
    }
  }

  // Ordena por severidade: ASN de cheat primeiro, depois hosting
  conflicts.sort((a, b) => {
    if (a.isCheatASN !== b.isCheatASN) return a.isCheatASN ? -1 : 1
    return b.hits - a.hits
  })

  return conflicts
}

// ─── MÓDULO 2: SHORTCUTS SUSPEITOS ──────────────────────────────────────────
// Filtra com.apple.ShortcutsActions e sinaliza se intervalBegin coincidir
// com pico de tráfego de rede de um jogo-alvo (Free Fire / PUBG etc.)

const TARGET_GAME_BUNDLES = new Set([
  "com.dts.freefireth",
  "com.dts.freefiremax",
  "com.tencent.ig",           // PUBG Mobile
  "com.tencent.bgrealm",
  "com.activision.callofduty",
  "com.ea.ios.bfmobile",
])

function analyzeShortcuts(entries, temporalPeaks) {
  const SHORTCUTS_BUNDLE = "com.apple.ShortcutsActions"
  const WINDOW_MS = 5 * 60 * 1000

  // Coleta acessos do ShortcutsActions
  let shortcutEntries = entries.filter(e =>
    (e.bundleID === SHORTCUTS_BUNDLE ||
     (e.accessor && e.accessor.identifier === SHORTCUTS_BUNDLE)) &&
    (e.timeStamp || e.intervalBegin)
  )

  if (shortcutEntries.length === 0) return []

  // Monta um mapa de timestamps de tráfego dos jogos-alvo para detectar picos
  let gameTrafficWindows = []
  for (let e of entries) {
    if (e.type !== "networkActivity") continue
    if (!TARGET_GAME_BUNDLES.has(e.bundleID)) continue
    if (!e.timeStamp) continue
    gameTrafficWindows.push({
      ts:  new Date(e.timeStamp).getTime(),
      bid: e.bundleID,
      hits: e.hits || 1,
    })
  }

  // Usa picos detectados em analyzeTemporalPatterns se disponíveis
  let peakTs = (temporalPeaks || []).map(([label]) => {
    // label é "YYYY-M-D H:MM" — converte de volta
    let parts = label.match(/(\d+)-(\d+)-(\d+) (\d+):(\d+)/)
    if (!parts) return null
    return new Date(
      parseInt(parts[1]), parseInt(parts[2]), parseInt(parts[3]),
      parseInt(parts[4]), parseInt(parts[5])
    ).getTime()
  }).filter(Boolean)

  let alerts = []

  for (let sc of shortcutEntries) {
    let scTs = new Date(sc.intervalBegin || sc.timeStamp).getTime()
    if (isNaN(scTs)) continue

    // Verifica sobreposição com tráfego do jogo-alvo
    let matchingGame = gameTrafficWindows.find(g =>
      Math.abs(g.ts - scTs) <= WINDOW_MS
    )

    // Verifica sobreposição com pico global detectado
    let matchingPeak = peakTs.find(p => Math.abs(p - scTs) <= WINDOW_MS)

    if (!matchingGame && !matchingPeak) continue

    alerts.push({
      bundleID:    sc.bundleID || SHORTCUTS_BUNDLE,
      intervalBegin: sc.intervalBegin || sc.timeStamp,
      category:    sc.category || "?",
      matchedGame: matchingGame ? matchingGame.bid : null,
      matchedPeak: !!matchingPeak,
      diffMinutes: matchingGame
        ? Math.round(Math.abs(matchingGame.ts - scTs) / 60000)
        : matchingPeak
          ? Math.round(Math.abs(matchingPeak - scTs) / 60000)
          : null,
    })
  }

  return alerts
}

// ─── MÓDULO 3: SIDE-LOADING ──────────────────────────────────────────────────
// Detecta domínios de telemetria (sentry.io, appsflyer.com) em apps sem domínio
// oficial da App Store. Verifica indicadores de sideload: ppsspp.org, altstore.io.

const TELEMETRY_DOMAINS = [
  "sentry.io", "ingest.sentry.io",
  "appsflyer.com", "t.appsflyer.com", "api2.appsflyer.com",
  "amplitude.com", "api.amplitude.com",
  "mixpanel.com", "api.mixpanel.com",
  "segment.io", "api.segment.io",
  "firebase.io", "firebaseio.com",
  "bugsnag.com", "notify.bugsnag.com",
  "crashlytics.com",
  "adjust.com", "app.adjust.com",
  "branch.io", "api2.branch.io",
]

const SIDELOAD_INDICATOR_DOMAINS = [
  "ppsspp.org", "www.ppsspp.org",
  "altstore.io", "api.altstore.io",
  "sideloadly.io",
  "ipa.store",
  "signulous.com",
  "esign.yyyue.xyz",
  "udid.io",
  "diawi.com",
  "testflight.apple.com",  // legítimo mas monitorar contexto
]

// Domínios oficiais de apps que normalmente estão na App Store
const APP_STORE_OFFICIAL_DOMAINS = new Set([
  "apple.com", "icloud.com", "mzstatic.com", "phobos.apple.com",
  "apps.apple.com", "itunes.apple.com",
])

function analyzeSideloading(entries) {
  let netEntries = entries.filter(e => e.type === "networkActivity" && e.domain && e.bundleID)

  // Agrupa domínios por bundleID
  let byBundle = {}
  for (let e of netEntries) {
    let bid = e.bundleID
    if (!byBundle[bid]) byBundle[bid] = { domains: new Set(), hits: 0 }
    byBundle[bid].domains.add((e.domain || "").toLowerCase())
    byBundle[bid].hits += (e.hits || 1)
  }

  let findings = []

  for (let [bundleID, info] of Object.entries(byBundle)) {
    let domains = [...info.domains]

    // Detecta domínios de telemetria presentes
    let telemetryHits = TELEMETRY_DOMAINS.filter(td =>
      domains.some(d => d === td || d.endsWith("." + td))
    )

    // Detecta indicadores de sideload
    let sideloadHits = SIDELOAD_INDICATOR_DOMAINS.filter(sd =>
      domains.some(d => d === sd || d.endsWith("." + sd))
    )

    if (telemetryHits.length === 0 && sideloadHits.length === 0) continue

    // Verifica se o app tem domínio oficial da App Store
    let hasOfficialDomain = domains.some(d =>
      [...APP_STORE_OFFICIAL_DOMAINS].some(od => d.endsWith(od))
    )

    // Sideload suspeito: app com telemetria mas SEM domínio oficial OU com indicadores diretos
    let isSideloadSuspect = sideloadHits.length > 0 || !hasOfficialDomain

    // Só reporta se há alguma suspeita
    if (!isSideloadSuspect && telemetryHits.length === 0) continue

    // Determina severidade
    let severity = sideloadHits.length > 0 ? "CRITICAL" :
                   (!hasOfficialDomain && telemetryHits.length > 0) ? "HIGH" : "MEDIUM"

    findings.push({
      bundleID,
      telemetryDomains: telemetryHits,
      sideloadDomains:  sideloadHits,
      hasOfficialDomain,
      totalDomains:     domains.length,
      hits:             info.hits,
      severity,
    })
  }

  // Ordena: CRITICAL > HIGH > MEDIUM, depois por hits
  const sevOrder = { CRITICAL: 0, HIGH: 1, MEDIUM: 2 }
  findings.sort((a, b) =>
    sevOrder[a.severity] - sevOrder[b.severity] || b.hits - a.hits
  )

  return findings
}

// ─── MÓDULO 4: URLs DE SCRIPT ────────────────────────────────────────────────
// Regex em domain para raw.githubusercontent.com, gist.github, pastebin, CDNs.
// Se dk.simonbs.Scriptable acessar esses domínios → alerta Risco Crítico.

const SCRIPT_URL_PATTERNS = [
  { regex: /raw\.githubusercontent\.com/i,  label: "GitHub Raw (execução direta de código)" },
  { regex: /gist\.github(usercontent)?\.com/i, label: "GitHub Gist (script público)" },
  { regex: /pastebin\.com/i,                label: "Pastebin (código não auditado)" },
  { regex: /pastecode\.io/i,                label: "PasteCode (código não auditado)" },
  { regex: /hastebin\.com/i,                label: "Hastebin (código não auditado)" },
  { regex: /cdn\.jsdelivr\.net/i,           label: "jsDelivr CDN (entrega de scripts)" },
  { regex: /unpkg\.com/i,                   label: "UNPKG CDN (entrega de scripts)" },
  { regex: /cdnjs\.cloudflare\.com/i,       label: "CDNJS/Cloudflare CDN" },
  { regex: /rawgit\.com/i,                  label: "RawGit (GitHub raw deprecated)" },
  { regex: /script\.google\.com/i,          label: "Google Apps Script" },
  { regex: /glitch\.me/i,                   label: "Glitch.me (hosting de scripts)" },
  { regex: /replit\.com/i,                  label: "Replit (execução remota)" },
  { regex: /\.workers\.dev/i,               label: "Cloudflare Workers (execução serverless)" },
  { regex: /\.vercel\.app/i,                label: "Vercel (deploy dinâmico)" },
  { regex: /\.netlify\.app/i,               label: "Netlify (deploy dinâmico)" },
]

const SCRIPTABLE_BUNDLE = "dk.simonbs.Scriptable"

function analyzeScriptURLs(entries) {
  let netEntries = entries.filter(e => e.type === "networkActivity" && e.domain && e.bundleID)

  let findings = []

  for (let e of netEntries) {
    let domain = (e.domain || "").toLowerCase()
    let bundleID = e.bundleID || ""

    for (let pattern of SCRIPT_URL_PATTERNS) {
      if (!pattern.regex.test(domain)) continue

      let isScriptable = bundleID === SCRIPTABLE_BUNDLE
      let severity = isScriptable ? "CRITICAL" : "HIGH"

      // Evita duplicatas por (bundleID + domínio + padrão)
      let key = `${bundleID}||${domain}||${pattern.label}`
      if (findings.some(f => f._key === key)) continue

      findings.push({
        _key:       key,
        bundleID,
        domain:     e.domain,
        pattern:    pattern.label,
        isScriptable,
        severity,
        hits:       e.hits || 1,
        timeStamp:  e.timeStamp || null,
      })
      break
    }
  }

  // Agrega por bundleID + domínio, somando hits
  let aggregated = {}
  for (let f of findings) {
    let k = `${f.bundleID}||${f.domain}`
    if (!aggregated[k]) {
      aggregated[k] = { ...f, hits: 0 }
      delete aggregated[k]._key
    }
    // Reinsere com hits acumulados
    if (!aggregated[f._key]) aggregated[f._key] = { ...f }
    else aggregated[f._key].hits += f.hits
  }

  let result = Object.values(aggregated)
  // Ordena: Scriptable CRITICAL primeiro, depois HIGH, depois hits
  result.sort((a, b) => {
    if (a.isScriptable !== b.isScriptable) return a.isScriptable ? -1 : 1
    if (a.severity !== b.severity) return a.severity === "CRITICAL" ? -1 : 1
    return b.hits - a.hits
  })

  return result
}

// ─── MÓDULO 5: GHOST ACTIVITY (avançado) ─────────────────────────────────────
// Lista bundleIDs com atividade de rede/sensores ausentes de um array
// installedApps fornecido pelo analista. Complementa a detecção anterior.

function analyzeGhostActivity(entries, installedApps) {
  // installedApps: array de strings com bundleIDs conhecidos do dispositivo
  if (!installedApps || installedApps.length === 0) return { ghosts: [], orphans: [] }

  let knownApps = new Set(installedApps.map(b => (b || "").trim()).filter(Boolean))

  // Coleta todos bundleIDs com atividade no relatório
  let activeInReport = new Set()
  for (let e of entries) {
    let bid = e.bundleID || (e.accessor && e.accessor.identifier) || null
    if (bid) activeInReport.add(bid)
  }

  // GHOST: bundleID ativo no relatório mas AUSENTE de installedApps
  // (app operando sem estar instalado visivelmente → possível app fantasma/injetado)
  let ghosts = [...activeInReport].filter(bid => {
    if (knownApps.has(bid)) return false
    // Exclui identificadores do sistema Apple
    if (bid.startsWith("com.apple.") && !CHEAT_APPS[bid]) return false
    return true
  }).map(bid => {
    let netE = entries.filter(e =>
      e.type === "networkActivity" && e.bundleID === bid
    )
    let accE = entries.filter(e =>
      e.type === "access" && (e.bundleID === bid || (e.accessor && e.accessor.identifier === bid))
    )
    let domains = [...new Set(netE.map(e => e.domain).filter(Boolean))]
    let categories = [...new Set(accE.map(e => e.category).filter(Boolean))]
    let hits = netE.reduce((s, e) => s + (e.hits || 1), 0)
    let isKnownCheat = !!CHEAT_APPS[bid]
    return {
      bundleID:   bid,
      domains:    domains.slice(0, 10),
      categories,
      netEvents:  netE.length,
      accEvents:  accE.length,
      hits,
      isKnownCheat,
      severity:   isKnownCheat ? "CRITICAL" : hits > 50 ? "HIGH" : "MEDIUM",
    }
  })

  // ORPHAN: bundleID em installedApps com ZERO atividade no relatório
  // (app instalado que não aparece → pode ter limpado rastros)
  let orphans = [...knownApps].filter(bid => !activeInReport.has(bid))
    .map(bid => ({
      bundleID: bid,
      isKnownCheat: !!CHEAT_APPS[bid],
    }))

  // Ordena ghosts por severidade
  const sevOrder = { CRITICAL: 0, HIGH: 1, MEDIUM: 2 }
  ghosts.sort((a, b) =>
    sevOrder[a.severity] - sevOrder[b.severity] || b.hits - a.hits
  )

  return { ghosts, orphans }
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

async function analyze(entries, installedApps) {
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

  // Ghost app findings (legado — domínios suspeitos conhecidos)
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

  // ── MÓDULO 1: IP vs Localização ─────────────────────────────────────────
  // Monta mapa domain→ipInfo a partir dos resultados do batch lookup
  let ipLookupMap = {}
  // O candidates array já contém ip + info resolvida; reaproveitamos após probe
  // (preenchido abaixo após o loop de lookup — ver ipLookupMapRaw)
  let ipVsLocationFindings = []
  try {
    // Reconstrói o mapa domain→info a partir dos dados já processados em candidates
    let ipInfoMap = {}
    for (let c of candidates) {
      ipInfoMap[c.domain] = {
        status: "success",
        country: c.country, city: c.city,
        isp: c.isp, org: c.org, as: c.as,
        hosting: c.hosting, proxy: c.proxy,
        reverse: c.reverse,
      }
    }
    ipVsLocationFindings = analyzeIPvsLocation(entries, ipInfoMap)
  } catch(e) { console.log("Módulo 1 erro: " + e) }

  // ── MÓDULO 2: Shortcuts Suspeitos ────────────────────────────────────────
  let shortcutFindings = []
  try {
    let { spikes: _sp, ...tempRaw } = temporalAnalysis
    // Extrai os picos brutos do byMinute para passar ao módulo
    let byMinuteEntries = []
    let _bm = {}
    for (let e of netEntries) {
      if (!e.timeStamp) continue
      let d = new Date(e.timeStamp)
      let key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}`
      _bm[key] = (_bm[key] || 0) + (e.hits || 1)
    }
    let avgAll = Object.values(_bm).length
      ? Object.values(_bm).reduce((s,v) => s+v, 0) / Object.values(_bm).length
      : 0
    byMinuteEntries = Object.entries(_bm).filter(([,v]) => v > avgAll * 3)
    shortcutFindings = analyzeShortcuts(entries, byMinuteEntries)
  } catch(e) { console.log("Módulo 2 erro: " + e) }

  // ── MÓDULO 3: Side-Loading ───────────────────────────────────────────────
  let sideloadFindings = []
  try {
    sideloadFindings = analyzeSideloading(entries)
  } catch(e) { console.log("Módulo 3 erro: " + e) }

  // ── MÓDULO 4: URLs de Script ─────────────────────────────────────────────
  let scriptURLFindings = []
  try {
    scriptURLFindings = analyzeScriptURLs(entries)
  } catch(e) { console.log("Módulo 4 erro: " + e) }

  // ── MÓDULO 5: Ghost Activity (com installedApps) ─────────────────────────
  let ghostActivityResult = { ghosts: [], orphans: [] }
  try {
    ghostActivityResult = analyzeGhostActivity(entries, installedApps || [])
  } catch(e) { console.log("Módulo 5 erro: " + e) }

  return {
    findings, netEntries, cheatAppFindings, knownCheatFindings,
    ghostAppFindings, proxyLoginFindings, temporalAnalysis, topApps, allDomains,
    // Módulos avançados
    ipVsLocationFindings, shortcutFindings, sideloadFindings,
    scriptURLFindings, ghostActivityResult,
  }
}

// ─── HTML BUILDER ────────────────────────────────────────────────────────────

function buildHTML(findings, netEntries, cheatAppFindings, knownCheatFindings, ipsFindings, ipsMeta, ghostAppFindings, proxyLoginFindings, temporalAnalysis, topApps, allDomains, filename, advModules) {
  let ipVsLocationFindings = (advModules && advModules.ipVsLocationFindings) || []
  let shortcutFindings     = (advModules && advModules.shortcutFindings)     || []
  let sideloadFindings     = (advModules && advModules.sideloadFindings)     || []
  let scriptURLFindings    = (advModules && advModules.scriptURLFindings)    || []
  let ghostActivityResult  = (advModules && advModules.ghostActivityResult)  || { ghosts: [], orphans: [] }
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
    let bundleList = p.bundles.map(b => `<span class="bundle-chip" style="color:#ff8800">${b}</span>`).join(" ")
    criticalCards += `<div class="card critical">
      <div class="card-head"><span class="badge critical">🔒 PROXY BYPASS LOGIN — CRÍTICO</span><span class="conns">${p.hits} conexões</span></div>
      <div class="card-domain">${p.domain}</div>
      <div class="cgrid">
        <div class="crow"><span class="clabel">Detecção</span><span class="cval reason">Domínio exclusivo do Free Fire chamado por app não autorizado — proxy interceptando login</span></div>
        <div class="crow"><span class="clabel">Interceptor</span><span class="cval">${bundleList}</span></div>
        <div class="crow"><span class="clabel">Esperado de</span><span class="cval"><span class="bundle-chip" style="color:#00e5a0">com.dts.freefireth</span> <span class="bundle-chip" style="color:#00e5a0">com.dts.freefiremax</span></span></div>
      </div></div>`
  }
  for (let k of knownCheatFindings) {
    let bundleList = k.bundles.map(b => `<span class="bundle-chip">${b}</span>`).join(" ")
    criticalCards += `<div class="card critical">
      <div class="card-head"><span class="badge critical" data-badge-type="known-cheat">⚠ CRÍTICO — CHEAT CONFIRMADO</span><span class="conns">${k.hits} conexões</span></div>
      <div class="card-domain">${k.indicator}</div>
      <div class="cgrid">
        <div class="crow"><span class="clabel">Cheat</span><span class="cval reason">${k.desc}</span></div>
        <div class="crow"><span class="clabel">Indicador</span><span class="cval">${k.indicator.includes(".")&&!k.indicator.match(/^\d+/)?"Domínio":"IP"} detectado no relatório de rede</span></div>
        `+(bundleList?'<div class="crow"><span class="clabel">Usado por</span><span class="cval">'+bundleList+'</span></div>':"")+`
      </div></div>`
  }
  for (let f of cheatAppFindings) {
    let suspectDomainSet = new Set(findings.map(f2 => f2.domain))
    let suspectDomains = f.domains.filter(d => suspectDomainSet.has(d))
    let suspectRows = suspectDomains.map(d => {
      let match = findings.find(f2 => f2.domain === d)
      let info = match ? ` — ${match.isp} (${match.country})` : ""
      return `<div class="domain-row"><span class="dbadge ${match?match.severity.toLowerCase():""}" data-sev="${match?match.severity:""}">${match?(match.severity==="HIGH"?"SUSPEITO":"POSSÍVEL"):""}</span>${d}${info}</div>`
    }).join("")
    criticalCards += `<div class="card critical">
      <div class="card-head"><span class="badge critical">⚠ CRÍTICO — APP PROXY/CHEAT</span><span class="conns">${f.hits} conexões</span></div>
      <div class="card-domain">${f.bundleID}</div>
      <div class="cgrid">
        <div class="crow"><span class="clabel">App</span><span class="cval reason">${f.desc}</span></div>
        <div class="crow"><span class="clabel">IPs suspeitos<br><span style="font-size:8px;color:#334">${suspectDomains.length}/${f.domains.length} dom.</span></span>
          <span class="cval">${suspectRows||'<span class="none">Nenhum IP suspeito detectado</span>'}</span></div>
      </div></div>`
  }

  // ── GHOST SECTION ───────────────────────────────────────────────────────
  let ghostSection = ""
  if (ghostAppFindings && ghostAppFindings.length > 0) {
    let ghostRows = ghostAppFindings.map(g => {
      let domList = g.domains.slice(0,5).map(d => `<span class="ghost-dom-chip">${d}</span>`).join("")
      let more = g.domains.length > 5 ? `<span class="ghost-more">+${g.domains.length-5} mais</span>` : ""
      return `<div class="ghost-row">
        <div style="flex:1;min-width:0"><div class="ghost-bundle">${g.bundleID}</div><div class="ghost-domains">${domList}${more}</div></div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:3px;flex-shrink:0">
          <span class="ghost-hits">${g.hits}</span>
          <span class="ghost-warn">⚠ domínios suspeitos</span>
        </div></div>`
    }).join("")
    ghostSection = `<div class="ghost-panel">
      <div class="ghost-panel-head"><span style="font-size:20px">👻</span>
        <span class="ghost-ptitle">Apps com domínios suspeitos</span>
        <span class="ghost-pc">${ghostAppFindings.length}</span></div>
      <div class="ghost-rows">${ghostRows}</div>
      <div class="ghost-hint">⚠ Verifique se esses apps são legítimos e se foram instalados corretamente pela App Store</div>
    </div>`
  }

  // ── IPS SECTION ─────────────────────────────────────────────────────────
  let ipsSection = ""
  if (ipsFindings && ipsFindings.length > 0) {
    let ipsRows = ipsFindings.map(f => `<div class="ips-row ips-row-${f.category||'warning'}">
      <div style="flex:1;min-width:0">
        <div><span class="ips-cat ips-cat-${f.category||'warning'}">${f.category==='critical'?'🚨 CRÍTICO':f.category==='vpn'?'🔒 VPN/PROXY':f.category==='developer'?'🛠 DEVELOPER':'⚠ SUSPEITO'}</span></div>
        <div class="ips-bid">${f.bundleId}</div>
        <div class="ips-reason">${f.reason}</div>
      </div>
      <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px;flex-shrink:0">
        <span class="ips-ver">v${f.version}</span>
        <span class="ips-evt ${f.eventType==='launches'?'launched':'installed'}">${f.eventType==='launches'?'▶ Aberto':'⬇ Instalado'}</span>
      </div></div>`).join("")
    ipsSection = `<div class="ips-panel">
      <div class="ips-panel-head"><span style="font-size:20px">📲</span>
        <span class="ips-ptitle">Apps Suspeitos Instalados</span>
        <span class="ips-pc">${ipsFindings.length}</span></div>
      <div class="ips-rows">${ipsRows}</div>
      <div class="ips-hint">⚠ Apps encontrados nos dados de análise do iPhone — indicam presença de ferramentas de cheat/jailbreak/proxy</div>
    </div>`
  }

  // ── ROOTS WARNING ────────────────────────────────────────────────────────
  let rootsWarn = ""
  if (ipsMeta && ipsMeta.rootsInstalled > 0) {
    rootsWarn = `<div class="alert-banner alert-roots">
      <div class="alert-icon">🔐</div>
      <div class="alert-body">
        <div class="alert-label">Certificado Raiz Suspeito</div>
        <div class="alert-value">${ipsMeta.rootsInstalled} certificado${ipsMeta.rootsInstalled>1?"s":""} raiz instalado${ipsMeta.rootsInstalled>1?"s":""}</div>
        <div class="alert-hint">Certificados raiz permitem interceptar tráfego HTTPS — padrão de proxy cheat tipo mitmproxy</div>
      </div></div>`
  }

  // ── STALE BANNER ─────────────────────────────────────────────────────────
  let staleBanner = staleWarning ? `<div class="alert-banner alert-stale">
    <div class="alert-icon">🕑</div>
    <div class="alert-body">
      <div class="alert-label">Arquivo possivelmente antigo</div>
      <div class="alert-value">Último registro: ${staleStr}</div>
      <div class="alert-hint stale-hint">Suspeita: arquivo gerado fora do período da partida para esconder atividade.</div>
    </div></div>` : ""

  // ── FF BANNER ─────────────────────────────────────────────────────────
  function loginColor(type) {
    if (type.includes("Facebook")) return "#1877f2"
    if (type.includes("Twitter")||type.includes("X")) return "#1da1f2"
    if (type.includes("Gmail")) return "#ea4335"
    if (type.includes("VK")) return "#4a76a8"
    return "#445577"
  }
  let ffSessionRowsHtml = ffSessions.map((s,i) => {
    let col = loginColor(s.loginType)
    let label = i===0?"Última abertura":i===1?"2ª abertura":"3ª abertura"
    return `<div class="ff-session-row">
      <div style="display:flex;flex-direction:column;gap:1px">
        <span class="ff-snum">${label}</span>
        <span class="ff-sts">${s.ts}</span>
      </div>
      <span class="ff-login-badge" style="background:${col}1a;color:${col};border:1px solid ${col}44">${s.loginType}</span>
    </div>`
  }).join("")
  let ffBanner = ffStr ? `<div class="alert-banner alert-ff">
    <div class="alert-icon">🔥</div>
    <div class="alert-body">
      <div class="alert-label ff-label">${ffVersion||"Free Fire"} — Sessões no período</div>
      <div class="ff-session-block">${ffSessionRowsHtml}</div>
      <div class="alert-sub ff-count-label" style="margin-top:6px">${ffAll.length} inicializações registradas no período</div>
      <div class="alert-hint ff-hint">Se a última abertura foi após a partida → aplique o W.O!</div>
    </div></div>` : ""

  let appStoreBanner = appStoreLastTs ? `<div class="alert-banner alert-store">
    <div class="alert-icon">🛒</div>
    <div class="alert-body">
      <div class="alert-label">App Store aberta</div>
      <div class="alert-value">${fmtDt(appStoreLastTs)}</div>
      <div class="alert-hint">Se foi após a partida → aplique o W.O!</div>
    </div></div>` : ""

  // ── TOP APPS ────────────────────────────────────────────────────────────
  let topAppsSection = ""
  if (topApps && topApps.length > 0) {
    let maxHits = topApps[0][1]
    let topRows = topApps.map(([bid, hits], i) => {
      let pct = Math.round((hits / maxHits) * 100)
      let isSuspect = CHEAT_APPS[bid] || IPS_CHEAT_EXACT.has(bid)
      let color = isSuspect ? "#ff1744" : i === 0 ? "#0057ff" : "#1a3660"
      return `<div class="tapp-row">
        <div class="tapp-rank" style="color:${color}">#${i+1}</div>
        <div class="tapp-info">
          <div class="tapp-bid" style="color:${isSuspect?"#ff6666":"#8899bb"}">${bid}`+(isSuspect?'<span class="tapp-suspect-tag">⚠ SUSPEITO</span>':"")+`</div>
          <div class="tapp-bar"><div class="tapp-fill" data-w="${pct}%" style="width:${pct}%;background:${color}66"></div></div>
        </div>
        <div class="tapp-hits">${hits.toLocaleString()}</div>
      </div>`
    }).join("")
    topAppsSection = `<div class="panel">
      <div class="panel-head"><div class="panel-dot"></div><div class="panel-title">Top Apps por Conexões</div></div>
      <div class="tapp-list">${topRows}</div>
    </div>`
  }

  // ── ANÁLISE TEMPORAL ─────────────────────────────────────────────────────
  let temporalSection = ""
  if (temporalAnalysis && temporalAnalysis.totalMinutes > 0) {
    let hasSpikes = temporalAnalysis.spikes > 0
    temporalSection = `<div class="panel">
      <div class="panel-head"><div class="panel-dot"></div><div class="panel-title">Análise Temporal de Tráfego</div></div>
      <div class="tgrid">
        <div class="tcard">
          <div class="tlabel">Minutos monitorados</div>
          <div class="tval">${temporalAnalysis.totalMinutes}</div>
        </div>
        <div class="tcard">
          <div class="tlabel">Média conexões/min</div>
          <div class="tval">${temporalAnalysis.avgPerMinute}</div>
        </div>
        `+(hasSpikes ? '<div class="tcard tcard-warn" style="grid-column:1/-1"><div class="tlabel">Picos anômalos detectados</div><div class="tval warn">'+temporalAnalysis.spikes+'</div></div>' : "")+`
      </div>
      `+(hasSpikes ? '<div class="tspike">'+temporalAnalysis.spikes+' pico'+(temporalAnalysis.spikes>1?"s":"")+' anômalo'+(temporalAnalysis.spikes>1?"s":"")+' — uso atípico detectado</div><div class="thint">Picos de tráfego '+(temporalAnalysis.spikes>1?"indicam":"indica")+' uso intenso atípico — possível cheat ativo durante sessão de jogo</div>' : "")+`
    </div>`
  }

  // ── MÓDULO 1: IP vs Localização ─────────────────────────────────────────
  let ipVsLocSection = ""
  if (ipVsLocationFindings.length > 0) {
    let rows = ipVsLocationFindings.slice(0, 20).map(f => {
      let asnLabel = f.asnLabel ? ` — ${f.asnLabel}` : ""
      let badge = f.isCheatASN
        ? `<span class="adv-badge ab-crit">⚠ ASN Cheat${asnLabel}</span>`
        : `<span class="adv-badge ab-high">🏠 Hosting/Proxy</span>`
      return `<div class="adv-row">
        <div class="adv-row-top">${badge}
          <span class="adv-bundle">${f.bundleID}</span>
          <span class="adv-delta">Δ ${f.diffMinutes}min</span>
        </div>
        <div class="adv-domain">${f.domain}</div>
        <div class="adv-meta">
          📍 Localização: <strong>${f.locationTs}</strong> &nbsp;|&nbsp;
          🌐 Rede: <strong>${f.networkTs}</strong><br>
          🗺 ${f.ipCountry} / ${f.ipCity} &nbsp;·&nbsp; ${f.isp}
        </div>
      </div>`
    }).join("")
    ipVsLocSection = `<div class="adv-panel">
      <div class="adv-panel-head">
        <span class="adv-panel-icon">📡</span>
        <div class="adv-panel-text">
          <div class="adv-panel-title">Módulo 1 — IP vs Localização</div>
          <div class="adv-panel-sub">Infraestrutura VPS/Proxy ativa durante acesso a sensor GPS (±5 min)</div>
        </div>
        <span class="adv-panel-count adv-cnt-high">${ipVsLocationFindings.length}</span>
      </div>
      <div class="adv-body">${rows}</div>
      <div class="adv-foot">⚠ App de cheat pode consultar o GPS para adaptar comportamento (evitar zonas monitoradas) enquanto roteia tráfego por VPS</div>
    </div>`
  }

  // ── MÓDULO 2: Shortcuts Suspeitos ────────────────────────────────────────
  let shortcutSection = ""
  if (shortcutFindings.length > 0) {
    let rows = shortcutFindings.map(f => {
      let gameLabel = f.matchedGame
        ? `Jogo: <strong style="color:var(--warn)">${f.matchedGame}</strong>`
        : `Pico global de tráfego`
      return `<div class="adv-row">
        <div class="adv-row-top">
          <span class="adv-badge ab-crit">⚡ Shortcut + Pico</span>
          <span class="adv-bundle">${f.bundleID}</span>
          <span class="adv-delta">Δ ${f.diffMinutes}min</span>
        </div>
        <div class="adv-meta">
          🕐 intervalBegin: <strong>${f.intervalBegin}</strong><br>
          ${gameLabel} &nbsp;·&nbsp; Categoria: ${f.category}
        </div>
      </div>`
    }).join("")
    shortcutSection = `<div class="adv-panel">
      <div class="adv-panel-head">
        <span class="adv-panel-icon">⚡</span>
        <div class="adv-panel-text">
          <div class="adv-panel-title">Módulo 2 — Shortcuts Suspeitos</div>
          <div class="adv-panel-sub">com.apple.ShortcutsActions ativado durante pico de tráfego de jogo-alvo</div>
        </div>
        <span class="adv-panel-count adv-cnt-crit">${shortcutFindings.length}</span>
      </div>
      <div class="adv-body">${rows}</div>
      <div class="adv-foot">⚠ Atalhos executados no mesmo instante de picos de rede do jogo podem indicar automação de cheat — aim-bot, recoil, ESP via script</div>
    </div>`
  }

  // ── MÓDULO 3: Side-Loading ───────────────────────────────────────────────
  let sideloadSection = ""
  if (sideloadFindings.length > 0) {
    let rows = sideloadFindings.map(f => {
      let badge = f.severity === "CRITICAL"
        ? `<span class="adv-badge ab-crit">🚨 Sideload Confirmado</span>`
        : f.severity === "HIGH"
          ? `<span class="adv-badge ab-high">⚠ Suspeito</span>`
          : `<span class="adv-badge ab-med">ℹ Possível</span>`
      let telRow = f.telemetryDomains.length
        ? `<div class="adv-detail">📊 Telemetria: ${f.telemetryDomains.join(", ")}</div>` : ""
      let sideRow = f.sideloadDomains.length
        ? `<div class="adv-detail crit">🔗 Indicadores sideload: ${f.sideloadDomains.join(", ")}</div>` : ""
      let noStoreRow = !f.hasOfficialDomain
        ? `<div class="adv-detail" style="color:var(--amber)">❌ Sem domínio oficial da App Store</div>` : ""
      return `<div class="adv-row">
        <div class="adv-row-top">
          ${badge}
          <span class="adv-bundle">${f.bundleID}</span>
          <span class="adv-delta">${f.hits} hits</span>
        </div>
        ${telRow}${sideRow}${noStoreRow}
      </div>`
    }).join("")
    sideloadSection = `<div class="adv-panel">
      <div class="adv-panel-head">
        <span class="adv-panel-icon">📦</span>
        <div class="adv-panel-text">
          <div class="adv-panel-title">Módulo 3 — Side-Loading</div>
          <div class="adv-panel-sub">Telemetria de terceiros sem domínio App Store oficial / indicadores de sideload detectados</div>
        </div>
        <span class="adv-panel-count adv-cnt-high">${sideloadFindings.length}</span>
      </div>
      <div class="adv-body">${rows}</div>
      <div class="adv-foot">⚠ Apps sideloaded (AltStore, TrollStore, ESign) não passam pela revisão da Apple — podem conter cheats, keyloggers ou proxies MITM</div>
    </div>`
  }

  // ── MÓDULO 4: URLs de Script ─────────────────────────────────────────────
  let scriptSection = ""
  if (scriptURLFindings.length > 0) {
    let critScriptable = scriptURLFindings.filter(f => f.isScriptable)
    let rows = scriptURLFindings.map(f => {
      let badge = f.isScriptable
        ? `<span class="adv-badge ab-crit">🚨 RISCO CRÍTICO — Scriptable</span>`
        : `<span class="adv-badge ab-high">⚠ Script Remoto</span>`
      return `<div class="adv-row ${f.isScriptable ? "adv-row-scriptable" : ""}">
        <div class="adv-row-top">
          ${badge}
          <span class="adv-bundle">${f.bundleID}</span>
          <span class="adv-delta">${f.hits} hits</span>
        </div>
        <div class="adv-domain">${f.domain}</div>
        <div class="adv-meta">🔖 ${f.pattern}</div>
        `+(f.isScriptable ? '<div class="adv-detail crit">dk.simonbs.Scriptable executa JavaScript arbitrário baixado dessa URL — vetor confirmado de cheat via script remoto</div>' : "")+`
      </div>`
    }).join("")
    scriptSection = `<div class="adv-panel">
      <div class="adv-panel-head">
        <span class="adv-panel-icon">📜</span>
        <div class="adv-panel-text">
          <div class="adv-panel-title">Módulo 4 — URLs de Script Remoto</div>
          <div class="adv-panel-sub">GitHub Raw, Gist, Pastebin, CDNs${critScriptable.length > 0 ? " — ⚠ SCRIPTABLE DETECTADO" : ""}</div>
        </div>
        <span class="adv-panel-count ${critScriptable.length > 0 ? "adv-cnt-crit" : "adv-cnt-high"}">${scriptURLFindings.length}</span>
      </div>
      <div class="adv-body">${rows}</div>
      <div class="adv-foot">⚠ Acesso a repositórios de código remoto pode indicar download e execução de scripts de cheat em runtime</div>
    </div>`
  }

  // ── MÓDULO 5: Ghost Activity ─────────────────────────────────────────────
  let ghostActivitySection = ""
  let { ghosts, orphans } = ghostActivityResult
  if (ghosts.length > 0 || orphans.length > 0) {
    let ghostRows = ghosts.map(g => {
      let badge = g.isKnownCheat
        ? `<span class="adv-badge ab-crit">🚨 Cheat Conhecido</span>`
        : g.severity === "HIGH"
          ? `<span class="adv-badge ab-high">👻 Fantasma Alta Ativ.</span>`
          : `<span class="adv-badge ab-med">👻 App Fantasma</span>`
      let domList = g.domains.slice(0, 5).map(d =>
        `<span class="ghost-dom-chip">${d}</span>`
      ).join(" ")
      let catList = g.categories.length
        ? `<div class="adv-detail">Sensores acessados: ${g.categories.join(", ")}</div>` : ""
      return `<div class="adv-row">
        <div class="adv-row-top">
          ${badge}
          <span class="adv-bundle">${g.bundleID}</span>
          <span class="adv-delta">${g.hits} hits · ${g.netEvents} evt</span>
        </div>
        <div class="adv-domain">${domList}</div>
        ${catList}
      </div>`
    }).join("")
    let orphanBlock = orphans.length > 0
      ? `<div class="adv-orphan">
          <div class="adv-orphan-title">⬛ Apps instalados sem rastro no relatório — ${orphans.length} encontrados</div>
          <div class="adv-orphan-chips">`+orphans.map(function(o){return '<span class="adv-oc '+(o.isKnownCheat?"cheat":"")+'">'+o.bundleID+(o.isKnownCheat?" ⚠":"")+'</span>';}).join("")+`</div>
        </div>` : ""
    ghostActivitySection = `<div class="adv-panel">
      <div class="adv-panel-head">
        <span class="adv-panel-icon">👻</span>
        <div class="adv-panel-text">
          <div class="adv-panel-title">Módulo 5 — Ghost Activity</div>
          <div class="adv-panel-sub">BundleIDs ativos no relatório ausentes da lista de apps instalados fornecida</div>
        </div>
        <span class="adv-panel-count adv-cnt-high">${ghosts.length}</span>
      </div>
      `+(ghosts.length > 0 ? '<div class="adv-body">'+ghostRows+'</div>' : "")+`
      ${orphanBlock}
      <div class="adv-foot">⚠ Apps "fantasma" operam no dispositivo sem aparecer visivelmente — padrão de cheats injetados via TrollStore ou tweak de jailbreak</div>
    </div>`
  }


  let cards = ""
  if (findings.length === 0) {
    cards = `<div class="ok-panel">✓ Nenhum IP VPS / Hosting / Proxy detectado.</div>`
  } else {
    for (let f of findings) {
      let cls = f.tldSuspect ? "tld-flag" : f.severity === "HIGH" ? "high" : "medium"
      let sev = f.tldSuspect ? "⚠ DOMÍNIO SUSPEITO" : f.severity === "HIGH" ? "SUSPEITO" : "POSSÍVEL"
      let bundleList = f.bundles.map(b => `<span class="bundle-chip">${b}</span>`).join(" ")
      cards += `<div class="card ${cls}">
        <div class="card-head"><span class="badge ${cls}">${sev}</span><span class="conns">${f.hits} conexões</span></div>
        <div class="card-domain">${f.domain}</div>
        <div class="cgrid">
          <div class="crow"><span class="clabel">IP</span><span class="cval">${f.ip}</span></div>
          <div class="crow"><span class="clabel">País</span><span class="cval">${f.country} / ${f.city}</span></div>
          <div class="crow"><span class="clabel">Provedor</span><span class="cval isp">${f.isp}</span></div>
          <div class="crow"><span class="clabel">Org</span><span class="cval">${f.org}</span></div>
          `+(f.reverse?'<div class="crow"><span class="clabel">rDNS</span><span class="cval rdns">'+f.reverse+'</span></div>':"")+`
          `+(f.probe?'<div class="crow"><span class="clabel">HTTP</span><span class="cval">'+(f.probe.online?'<span class="http-on">● Online</span>'+(f.probe.status?' — HTTP '+f.probe.status:""  )+(f.probe.banner?' — <span class="http-banner">'+f.probe.banner+'</span>':""):'<span class="http-off">● Offline / Sem resposta</span>')+'</span></div>':"")+`
          <div class="crow"><span class="clabel">Motivo</span><span class="cval reason" data-reasons='${JSON.stringify(f.reasons)}'>${f.reasons.join("<br>")}</span></div>
          <div class="crow"><span class="clabel">Usado por</span><span class="cval">${bundleList}</span></div>
        </div></div>`
    }
  }

  // ── RISK SCORE ───────────────────────────────────────────────────────────
  let riskScore = Math.min(100, criticalCount * 25 + highCount * 10 + medCount * 3)
  let riskLabel = riskScore >= 75 ? "ALTÍSSIMO" : riskScore >= 50 ? "ALTO" : riskScore >= 25 ? "MÉDIO" : riskScore > 0 ? "BAIXO" : "LIMPO"
  let riskColor = riskScore >= 75 ? "#ff1744" : riskScore >= 50 ? "#ff6d00" : riskScore >= 25 ? "#ffab00" : riskScore > 0 ? "#69f0ae" : "#00e5a0"
  let verdictEmoji = riskScore >= 50 ? "🚨" : riskScore >= 25 ? "⚠️" : "✅"

  return `<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta charset="utf-8">
<title>PantherSS — Anti-Cheat Report</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=DM+Mono:wght@300;400;500&family=Bebas+Neue&family=Inter:wght@300;400;500;600&display=swap');

/* ═══════════════════════════════════════════════════════
   TOKENS — AMOLED PREMIUM
═══════════════════════════════════════════════════════ */
:root {
  --void:       #000000;
  --abyss:      #03060f;
  --deep:       #060d1a;
  --surface:    #0a1120;
  --panel:      #0d1628;
  --lift:       #111e35;
  --edge:       #1a2d50;
  --rim:        #1e3460;

  --azure:      #0057ff;
  --azure-hi:   #1a6eff;
  --azure-glow: #3380ff;
  --azure-dim:  #0033aa;
  --azure-fog:  rgba(0,87,255,0.08);
  --azure-mist: rgba(0,87,255,0.04);

  --plasma:     #00b4ff;
  --plasma-dim: rgba(0,180,255,0.15);

  --kill:       #ff1744;
  --kill-glow:  rgba(255,23,68,0.25);
  --kill-fog:   rgba(255,23,68,0.06);

  --warn:       #ff6d00;
  --warn-fog:   rgba(255,109,0,0.06);

  --amber:      #ffab00;
  --amber-fog:  rgba(255,171,0,0.06);

  --ok:         #00e5a0;
  --ok-fog:     rgba(0,229,160,0.06);

  --ink:        #e2eaf8;
  --ink-mid:    #8899bb;
  --ink-dim:    #445577;
  --ink-ghost:  rgba(226,234,248,0.04);

  --r: Rajdhani, sans-serif;
  --m: 'DM Mono', monospace;
  --b: 'Bebas Neue', cursive;
  --i: Inter, sans-serif;

  --rad-xs: 4px;
  --rad-sm: 8px;
  --rad-md: 12px;
  --rad-lg: 18px;
  --rad-xl: 24px;
}

/* ═══════════════════════════════════════════════════════
   RESET + BASE
═══════════════════════════════════════════════════════ */
*,*::before,*::after { box-sizing:border-box; margin:0; padding:0; }
html { scroll-behavior:smooth; -webkit-tap-highlight-color:transparent; }
body {
  background:var(--void);
  color:var(--ink);
  font-family:var(--i);
  font-size:13px;
  line-height:1.5;
  min-height:100vh;
  overflow-x:hidden;
  -webkit-font-smoothing:antialiased;
}

/* ═══════════════════════════════════════════════════════
   KEYFRAMES
═══════════════════════════════════════════════════════ */
@keyframes fadeUp   { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:none; } }
@keyframes fadeDown { from { opacity:0; transform:translateY(-16px); } to { opacity:1; transform:none; } }
@keyframes fadeIn   { from { opacity:0; } to { opacity:1; } }
@keyframes slideR   { from { opacity:0; transform:translateX(-20px); } to { opacity:1; transform:none; } }
@keyframes scaleUp  { from { opacity:0; transform:scale(0.92); } to { opacity:1; transform:scale(1); } }
@keyframes scanline { 0%,100% { transform:translateY(-100%); } }
@keyframes breathe  { 0%,100% { opacity:0.5; } 50% { opacity:1; } }
@keyframes spinArc  { to { stroke-dashoffset: 0; } }
@keyframes gridFade { from { opacity:0; } to { opacity:1; } }
@keyframes ripple   { from { transform:scale(0.8); opacity:1; } to { transform:scale(2.2); opacity:0; } }
@keyframes blink    { 0%,100%{opacity:1;} 50%{opacity:0.25;} }
@keyframes shimmer  { from{background-position:-200% center;} to{background-position:200% center;} }
@keyframes borderPulse { 0%,100%{border-color:rgba(0,87,255,0.2);} 50%{border-color:rgba(0,87,255,0.5);} }
@keyframes waveX    { 0%{transform:scaleX(0.95);} 50%{transform:scaleX(1);} 100%{transform:scaleX(0.95);} }
@keyframes floatUp  { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-3px);} }

/* ═══════════════════════════════════════════════════════
   AMBIENT GRID BACKGROUND
═══════════════════════════════════════════════════════ */
body::before {
  content:'';
  position:fixed; inset:0; z-index:0; pointer-events:none;
  background-image:
    linear-gradient(rgba(0,87,255,0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,87,255,0.025) 1px, transparent 1px);
  background-size:40px 40px;
  mask-image:radial-gradient(ellipse 80% 60% at 50% 0%, black 0%, transparent 80%);
  animation:gridFade 2s ease-out both;
}
body::after {
  content:'';
  position:fixed; top:0; left:0; right:0; height:60vh; z-index:0; pointer-events:none;
  background:radial-gradient(ellipse 70% 40% at 50% -10%, rgba(0,60,180,0.18) 0%, transparent 70%);
}

/* ═══════════════════════════════════════════════════════
   SCANLINE OVERLAY
═══════════════════════════════════════════════════════ */
.scanline-wrap {
  position:fixed; inset:0; z-index:1; pointer-events:none; overflow:hidden;
}
.scanline {
  position:absolute; top:0; left:0; right:0; height:120px;
  background:linear-gradient(transparent, rgba(0,87,255,0.022), transparent);
  animation:scanline 8s linear infinite;
}

/* ═══════════════════════════════════════════════════════
   LAYOUT WRAPPER
═══════════════════════════════════════════════════════ */
.layout { position:relative; z-index:10; }

/* ═══════════════════════════════════════════════════════
   HERO — COMMAND DECK
═══════════════════════════════════════════════════════ */
.hero {
  position:relative; overflow:hidden;
  padding:32px 20px 24px;
  background:var(--void);
  border-bottom:1px solid var(--edge);
}
.hero-noise {
  position:absolute; inset:0; pointer-events:none;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
  background-size:256px 256px; opacity:0.4;
}
.hero-glow {
  position:absolute; top:-40px; left:50%; transform:translateX(-50%);
  width:300px; height:200px; pointer-events:none;
  background:radial-gradient(ellipse, rgba(0,80,220,0.22) 0%, transparent 70%);
  animation:breathe 4s ease-in-out infinite;
}

/* ── LOGOTIPO ── */
.logo-wrap {
  display:flex; flex-direction:column; align-items:center; gap:0;
  position:relative; z-index:2;
  animation:fadeDown 0.7s cubic-bezier(.22,1,.36,1) both;
}
.logo-eyebrow {
  font-family:var(--m); font-size:9px; letter-spacing:3px;
  color:var(--azure-glow); text-transform:uppercase; margin-bottom:6px;
  opacity:0.7;
}
.logo-mark {
  display:flex; align-items:baseline; gap:0; line-height:1;
}
.logo-panther {
  font-family:var(--b); font-size:52px; letter-spacing:2px;
  color:#fff; text-shadow:0 0 40px rgba(0,87,255,0.35);
}
.logo-ss {
  font-family:var(--b); font-size:52px; letter-spacing:2px;
  background:linear-gradient(135deg, var(--azure-hi), var(--plasma));
  -webkit-background-clip:text; -webkit-text-fill-color:transparent;
  background-clip:text;
  text-shadow:none;
  filter:drop-shadow(0 0 12px rgba(0,87,255,0.5));
}
.logo-tagline {
  font-family:var(--m); font-size:8px; letter-spacing:2.5px;
  color:var(--ink-dim); text-transform:uppercase; margin-top:6px;
}
.logo-bar {
  width:60px; height:2px; margin:10px auto 0;
  background:linear-gradient(90deg, transparent, var(--azure-hi), transparent);
  animation:waveX 3s ease-in-out infinite;
}

/* ── LANG SWITCHER ── */
.lang-bar {
  display:flex; justify-content:center; gap:6px; margin-top:16px;
  position:relative; z-index:2;
  animation:fadeUp 0.7s cubic-bezier(.22,1,.36,1) 0.15s both;
}
.lang-btn {
  background:transparent; border:1px solid var(--edge);
  border-radius:var(--rad-sm); color:var(--ink-dim);
  font-family:var(--m); font-size:9px; letter-spacing:1.5px;
  padding:5px 13px; cursor:pointer; text-transform:uppercase;
  transition:all 0.25s ease;
}
.lang-btn:hover { border-color:var(--azure-dim); color:var(--ink); }
.lang-btn.active {
  background:rgba(0,87,255,0.12); border-color:var(--azure-hi);
  color:var(--azure-hi); box-shadow:0 0 16px rgba(0,87,255,0.15), inset 0 0 12px rgba(0,87,255,0.06);
}

/* ── HERO FILE CHIP ── */
.hero-file {
  display:flex; align-items:center; gap:8px;
  margin:16px auto 0; max-width:340px;
  background:var(--ink-ghost); border:1px solid var(--edge);
  border-radius:var(--rad-sm); padding:7px 12px;
  font-family:var(--m); font-size:9px; color:var(--ink-mid);
  word-break:break-all; position:relative; z-index:2;
  animation:fadeUp 0.7s cubic-bezier(.22,1,.36,1) 0.2s both;
}
.hero-file-dot { width:6px; height:6px; border-radius:50%; background:var(--azure-hi); flex-shrink:0; animation:blink 2s ease-in-out infinite; }
.hero-file strong { color:var(--ink); }

/* ── HERO STAT GRID ── */
.hero-grid {
  display:grid; grid-template-columns:1fr 1fr; gap:8px;
  margin:14px 0 0; position:relative; z-index:2;
  animation:fadeUp 0.7s cubic-bezier(.22,1,.36,1) 0.3s both;
}
.hg-card {
  background:var(--ink-ghost); border:1px solid var(--edge);
  border-radius:var(--rad-md); padding:12px 13px;
  transition:all 0.3s ease; position:relative; overflow:hidden;
}
.hg-card::before {
  content:''; position:absolute; inset:0; opacity:0;
  background:radial-gradient(circle at 50% 0%, rgba(0,87,255,0.08) 0%, transparent 70%);
  transition:opacity 0.3s;
}
.hg-card:hover::before { opacity:1; }
.hg-card:hover { border-color:rgba(0,87,255,0.3); transform:translateY(-1px); }
.hg-label {
  font-family:var(--m); font-size:8px; letter-spacing:1px;
  color:var(--ink-dim); text-transform:uppercase; margin-bottom:4px;
}
.hg-val { font-family:var(--r); font-size:14px; font-weight:600; color:var(--ink); }
.hg-val.blue { color:var(--azure-hi); font-size:16px; font-weight:700; }
.hg-val.warn { color:var(--kill); font-weight:700; }
.hg-card-full { grid-column:1/-1; }
.hg-card-warn { background:var(--kill-fog); border-color:rgba(255,23,68,0.2); animation:borderPulse 2s ease infinite; }

/* ═══════════════════════════════════════════════════════
   VERDICT STRIP
═══════════════════════════════════════════════════════ */
.verdict-strip {
  display:flex; align-items:center; gap:16px;
  padding:18px 20px;
  background:var(--abyss);
  border-bottom:1px solid var(--edge);
  position:relative; overflow:hidden;
  animation:slideR 0.6s cubic-bezier(.22,1,.36,1) 0.1s both;
}
.verdict-strip::after {
  content:''; position:absolute; bottom:0; left:0; right:0; height:1px;
  background:linear-gradient(90deg, transparent, var(--azure-dim), transparent);
}
.verdict-icon { font-size:36px; flex-shrink:0; animation:floatUp 3s ease-in-out infinite; }
.verdict-body { flex:1; min-width:0; }
.verdict-label {
  font-family:var(--m); font-size:8px; letter-spacing:2px;
  color:var(--ink-dim); text-transform:uppercase; margin-bottom:3px;
}
.verdict-value {
  font-family:var(--b); font-size:30px; letter-spacing:1px; line-height:1;
}
.verdict-ring { position:relative; width:58px; height:58px; flex-shrink:0; }
.verdict-ring svg { transform:rotate(-90deg); display:block; }
.verdict-ring-num {
  position:absolute; inset:0; display:flex; align-items:center; justify-content:center;
  font-family:var(--b); font-size:16px;
}

/* ═══════════════════════════════════════════════════════
   UPTIME RAIL
═══════════════════════════════════════════════════════ */
.uptime-rail {
  display:flex; align-items:center; gap:10px; flex-wrap:wrap;
  padding:10px 20px;
  background:var(--void); border-bottom:1px solid var(--edge);
}
.uptime-beacon {
  width:7px; height:7px; border-radius:50%; flex-shrink:0;
  animation:blink 2.5s ease-in-out infinite;
}
.uptime-text { font-family:var(--m); font-size:10px; color:var(--ink-dim); }
.uptime-text strong { color:var(--azure-hi); }
.uptime-pill {
  background:rgba(255,23,68,0.1); border:1px solid rgba(255,23,68,0.22);
  color:var(--kill); font-family:var(--m); font-size:8px; letter-spacing:0.5px;
  padding:3px 9px; border-radius:20px; font-weight:500;
}

/* ═══════════════════════════════════════════════════════
   MAIN CONTENT
═══════════════════════════════════════════════════════ */
.content { padding:16px 20px 40px; }

/* ═══════════════════════════════════════════════════════
   ALERT BANNERS (stale / ff / appstore / roots)
═══════════════════════════════════════════════════════ */
.alert-banner {
  display:flex; align-items:flex-start; gap:14px;
  border-radius:var(--rad-md); padding:14px 16px;
  margin-bottom:10px; border:1px solid;
  position:relative; overflow:hidden;
  animation:fadeUp 0.5s cubic-bezier(.22,1,.36,1) both;
}
.alert-banner::before {
  content:''; position:absolute; top:0; left:0; width:3px; height:100%;
}
.alert-ff    { background:var(--ok-fog);    border-color:rgba(0,229,160,0.15); }
.alert-ff::before    { background:var(--ok); }
.alert-store { background:var(--amber-fog); border-color:rgba(255,171,0,0.18); }
.alert-store::before { background:var(--amber); }
.alert-stale { background:var(--warn-fog);  border-color:rgba(255,109,0,0.18); }
.alert-stale::before { background:var(--warn); }
.alert-roots { background:var(--kill-fog);  border-color:rgba(255,23,68,0.18); animation:borderPulse 2s ease infinite; }
.alert-roots::before { background:var(--kill); }

.alert-icon { font-size:22px; flex-shrink:0; margin-top:1px; }
.alert-body { flex:1; min-width:0; }
.alert-label {
  font-family:var(--m); font-size:8px; letter-spacing:1.5px;
  text-transform:uppercase; font-weight:500; margin-bottom:4px;
}
.alert-ff    .alert-label { color:var(--ok); }
.alert-store .alert-label { color:var(--amber); }
.alert-stale .alert-label { color:var(--warn); }
.alert-roots .alert-label { color:var(--kill); }
.alert-value { font-family:var(--r); font-size:16px; font-weight:700; color:var(--ink); margin-bottom:3px; }
.alert-sub { font-family:var(--i); font-size:9px; color:var(--ink-mid); line-height:1.5; }
.alert-hint { font-family:var(--i); font-size:9px; color:var(--ink-dim); margin-top:3px; }
.ff-session-block { display:flex; flex-direction:column; gap:4px; }
.ff-session-row { display:flex; align-items:center; justify-content:space-between; gap:10px; padding:5px 0; border-top:1px solid rgba(255,255,255,0.04); }
.ff-session-row:first-child { border-top:none; }
.ff-snum { font-family:var(--m); font-size:8px; color:var(--ink-dim); }
.ff-sts { font-family:var(--r); font-size:14px; font-weight:600; color:var(--ink); }
.ff-login-badge { font-family:var(--m); font-size:8px; padding:3px 8px; border-radius:var(--rad-sm); white-space:nowrap; }

/* ═══════════════════════════════════════════════════════
   STAT ROW
═══════════════════════════════════════════════════════ */
.stat-row {
  display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px;
  margin-bottom:20px;
  animation:fadeUp 0.6s cubic-bezier(.22,1,.36,1) 0.2s both;
}
.stat-card {
  background:var(--ink-ghost); border:1px solid var(--edge);
  border-radius:var(--rad-md); padding:16px 12px 14px;
  text-align:center; position:relative; overflow:hidden;
  transition:all 0.3s ease; cursor:default;
}
.stat-card::after {
  content:''; position:absolute; bottom:0; left:0; right:0; height:2px;
  opacity:0.5; transition:opacity 0.3s;
}
.stat-card:hover::after { opacity:1; }
.stat-card:hover { transform:translateY(-2px); }
.stat-c::after { background:var(--kill); }
.stat-h::after { background:var(--azure-hi); }
.stat-m::after { background:var(--amber); }
.stat-c { border-color:rgba(255,23,68,0.15); }
.stat-h { border-color:rgba(0,87,255,0.2); }
.stat-m { border-color:rgba(255,171,0,0.15); }
.stat-card:hover.stat-c { border-color:rgba(255,23,68,0.35); box-shadow:0 8px 24px rgba(255,23,68,0.1); }
.stat-card:hover.stat-h { border-color:rgba(0,87,255,0.4); box-shadow:0 8px 24px rgba(0,87,255,0.12); }
.stat-card:hover.stat-m { border-color:rgba(255,171,0,0.35); box-shadow:0 8px 24px rgba(255,171,0,0.08); }
.stat-num { font-family:var(--b); font-size:38px; line-height:1; margin-bottom:4px; }
.stat-c .stat-num { color:var(--kill); text-shadow:0 0 20px rgba(255,23,68,0.4); }
.stat-h .stat-num { color:var(--azure-hi); text-shadow:0 0 20px rgba(0,87,255,0.4); }
.stat-m .stat-num { color:var(--amber); text-shadow:0 0 20px rgba(255,171,0,0.3); }
.stat-lbl { font-family:var(--m); font-size:8px; letter-spacing:1.2px; text-transform:uppercase; color:var(--ink-dim); }

/* ═══════════════════════════════════════════════════════
   SECTION HEADERS
═══════════════════════════════════════════════════════ */
.sec-head {
  display:flex; align-items:center; gap:12px;
  margin:24px 0 12px; position:relative;
  animation:fadeDown 0.5s cubic-bezier(.22,1,.36,1) both;
}
.sec-head::before {
  content:''; position:absolute; bottom:-6px; left:0; right:0; height:1px;
  background:linear-gradient(90deg, var(--edge) 0%, transparent 100%);
}
.sec-icon {
  width:34px; height:34px; border-radius:var(--rad-sm);
  display:flex; align-items:center; justify-content:center;
  font-size:16px; flex-shrink:0;
  border:1px solid;
}
.sec-ic-crit { background:rgba(255,23,68,0.08); border-color:rgba(255,23,68,0.2); }
.sec-ic-high { background:rgba(0,87,255,0.08);  border-color:rgba(0,87,255,0.2); }
.sec-ic-med  { background:rgba(255,171,0,0.06); border-color:rgba(255,171,0,0.2); }
.sec-text { flex:1; }
.sec-title {
  font-family:var(--r); font-size:13px; font-weight:700;
  letter-spacing:0.5px; text-transform:uppercase;
}
.sec-tc { color:var(--kill); }
.sec-th { color:var(--azure-hi); }
.sec-tm { color:var(--amber); }
.sec-sub { font-family:var(--m); font-size:8px; color:var(--ink-dim); margin-top:1px; }
.sec-count {
  font-family:var(--b); font-size:18px; padding:2px 12px;
  border-radius:20px; border:1px solid; flex-shrink:0;
}
.sec-cc { color:var(--kill); border-color:rgba(255,23,68,0.25); background:rgba(255,23,68,0.06); }
.sec-ch { color:var(--azure-hi); border-color:rgba(0,87,255,0.25); background:var(--azure-fog); }
.sec-cm { color:var(--amber); border-color:rgba(255,171,0,0.25); background:var(--amber-fog); }

/* ═══════════════════════════════════════════════════════
   DETECTION CARDS
═══════════════════════════════════════════════════════ */
.card {
  border-radius:var(--rad-lg); margin-bottom:10px;
  border:1px solid var(--edge); overflow:hidden;
  position:relative; transition:all 0.3s ease;
  animation:fadeUp 0.5s cubic-bezier(.22,1,.36,1) both;
  background:var(--deep);
}
.card::before {
  content:''; position:absolute; top:0; left:0; width:3px; height:100%;
  transition:width 0.3s ease;
}
.card:hover::before { width:4px; }
.card:hover { transform:translateX(3px); box-shadow:0 8px 32px rgba(0,0,0,0.5); }
.card.critical { background:rgba(8,2,14,0.9); }
.card.critical::before { background:var(--kill); }
.card.critical:hover { border-color:rgba(255,23,68,0.3); box-shadow:0 8px 32px rgba(255,23,68,0.1); }
.card.tld-flag { background:rgba(10,8,2,0.9); }
.card.tld-flag::before { background:var(--amber); }
.card.tld-flag:hover { border-color:rgba(255,171,0,0.3); }
.card.high::before { background:var(--azure-hi); }
.card.high:hover { border-color:rgba(0,87,255,0.35); box-shadow:0 8px 32px rgba(0,87,255,0.1); }
.card.medium::before { background:var(--amber); }
.card.medium:hover { border-color:rgba(255,171,0,0.3); }

/* card header */
.card-head {
  display:flex; align-items:center; justify-content:space-between;
  padding:13px 16px 0;
}
.badge {
  font-family:var(--m); font-size:9px; letter-spacing:0.8px;
  padding:4px 10px; border-radius:20px; border:1px solid;
  text-transform:uppercase;
}
.badge.critical { color:#ff4466; border-color:rgba(255,23,68,0.3); background:rgba(255,23,68,0.08); }
.badge.tld-flag { color:var(--amber); border-color:rgba(255,171,0,0.3); background:rgba(255,171,0,0.07); }
.badge.high     { color:var(--azure-hi); border-color:rgba(0,87,255,0.3); background:var(--azure-fog); }
.badge.medium   { color:var(--amber); border-color:rgba(255,171,0,0.3); background:rgba(255,171,0,0.06); }
.conns { font-family:var(--m); font-size:9px; color:var(--ink-dim); }

/* card domain */
.card-domain {
  font-family:var(--m); font-size:12px; color:var(--ink);
  padding:7px 16px 4px; word-break:break-all; font-weight:500;
}

/* card grid */
.cgrid { padding:0 16px 14px; }
.crow {
  display:flex; gap:12px; padding:7px 0;
  border-top:1px solid rgba(255,255,255,0.04); align-items:flex-start;
}
.clabel {
  font-family:var(--m); font-size:9px; color:var(--ink-dim);
  min-width:72px; flex-shrink:0; padding-top:1px;
  letter-spacing:0.3px; line-height:1.5;
}
.cval { font-family:var(--m); font-size:10px; color:#b0c4de; flex:1; word-break:break-all; line-height:1.6; }
.cval.isp { color:var(--amber); }
.cval.reason { color:var(--kill); font-weight:500; }
.cval.rdns { color:var(--plasma); font-style:italic; }
.http-on { color:var(--ok); font-weight:600; }
.http-off { color:var(--ink-dim); }
.http-banner { color:var(--kill); text-transform:uppercase; font-size:9px; }

.bundle-chip {
  display:inline-block; background:var(--ink-ghost); border:1px solid var(--edge);
  border-radius:var(--rad-xs); padding:2px 7px; font-size:8px; color:var(--ink-dim);
  font-family:var(--m); margin:2px; word-break:break-all;
}
.domain-row { padding:3px 0; font-family:var(--m); font-size:10px; color:#b0c4de; word-break:break-all; }
.dbadge { display:inline-block; font-size:8px; padding:2px 6px; border-radius:var(--rad-xs); margin-right:5px; vertical-align:middle; font-family:var(--m); }
.dbadge.high   { background:rgba(0,87,255,0.1); color:var(--azure-hi); border:1px solid rgba(0,87,255,0.2); }
.dbadge.medium { background:rgba(255,171,0,0.08); color:var(--amber); border:1px solid rgba(255,171,0,0.2); }

.none { color:var(--ink-dim); font-style:italic; }
.ok-panel {
  background:var(--ok-fog); border:1px solid rgba(0,229,160,0.18);
  border-radius:var(--rad-md); padding:20px; text-align:center;
  font-family:var(--r); font-size:15px; font-weight:600; color:var(--ok);
  animation:scaleUp 0.6s cubic-bezier(.22,1,.36,1) both;
}
.divider { height:1px; background:linear-gradient(90deg, transparent, var(--edge), transparent); margin:20px 0; }

/* ═══════════════════════════════════════════════════════
   TEMPORAL + TOP APPS
═══════════════════════════════════════════════════════ */
.panel {
  background:var(--deep); border:1px solid var(--edge);
  border-radius:var(--rad-lg); padding:16px;
  margin-bottom:12px;
  animation:fadeUp 0.5s cubic-bezier(.22,1,.36,1) both;
}
.panel-head {
  display:flex; align-items:center; gap:8px; margin-bottom:14px;
}
.panel-title { font-family:var(--r); font-size:12px; font-weight:700; letter-spacing:0.5px; color:var(--ink); text-transform:uppercase; }
.panel-dot { width:6px; height:6px; border-radius:50%; background:var(--azure-hi); flex-shrink:0; }

.tgrid { display:grid; grid-template-columns:1fr 1fr; gap:8px; }
.tcard {
  background:var(--surface); border:1px solid var(--edge);
  border-radius:var(--rad-md); padding:10px 12px;
  transition:all 0.25s ease;
}
.tcard:hover { border-color:rgba(0,87,255,0.3); background:var(--panel); }
.tcard-warn { background:rgba(255,171,0,0.04) !important; border-color:rgba(255,171,0,0.18) !important; }
.tlabel { font-family:var(--m); font-size:8px; letter-spacing:1px; color:var(--ink-dim); text-transform:uppercase; margin-bottom:4px; }
.tval { font-family:var(--b); font-size:22px; color:var(--azure-hi); }
.tval.warn { color:var(--warn); }
.tspike {
  display:inline-flex; align-items:center; gap:5px;
  background:rgba(255,171,0,0.07); border:1px solid rgba(255,171,0,0.2);
  border-radius:20px; padding:4px 10px;
  font-family:var(--m); font-size:8px; color:var(--amber);
  margin-top:8px;
}
.tspike::before { content:'⚡'; }
.thint { font-family:var(--i); font-size:9px; color:var(--ink-dim); margin-top:8px; line-height:1.5; padding-top:8px; border-top:1px solid rgba(255,255,255,0.05); }

/* top apps */
.tapp-list { display:flex; flex-direction:column; gap:6px; }
.tapp-row {
  display:flex; align-items:center; gap:10px;
  padding:9px 11px; border-radius:var(--rad-sm);
  background:var(--surface); border:1px solid var(--edge);
  transition:all 0.25s ease; animation:slideR 0.4s cubic-bezier(.22,1,.36,1) both;
}
.tapp-row:hover { border-color:rgba(0,87,255,0.25); background:var(--panel); transform:translateX(2px); }
.tapp-rank { font-family:var(--b); font-size:15px; width:26px; text-align:center; flex-shrink:0; }
.tapp-info { flex:1; min-width:0; }
.tapp-bid { font-family:var(--m); font-size:8px; color:var(--ink-mid); word-break:break-all; margin-bottom:3px; }
.tapp-bar { height:2px; border-radius:1px; overflow:hidden; background:rgba(255,255,255,0.05); }
.tapp-fill { height:100%; border-radius:1px; transition:width 0.8s cubic-bezier(.22,1,.36,1); }
.tapp-suspect-tag {
  font-family:var(--m); font-size:8px; color:var(--kill);
  background:rgba(255,23,68,0.1); border:1px solid rgba(255,23,68,0.2);
  padding:1px 6px; border-radius:var(--rad-xs); margin-left:4px;
}
.tapp-hits { font-family:var(--r); font-size:13px; font-weight:600; color:var(--ink-dim); flex-shrink:0; }

/* ═══════════════════════════════════════════════════════
   GHOST SECTION (legacy)
═══════════════════════════════════════════════════════ */
.ghost-panel {
  background:var(--deep); border:1px solid var(--edge);
  border-radius:var(--rad-lg); padding:16px; margin-bottom:12px;
  animation:fadeUp 0.5s cubic-bezier(.22,1,.36,1) both;
}
.ghost-panel-head { display:flex; align-items:center; gap:10px; margin-bottom:12px; }
.ghost-ptitle { font-family:var(--r); font-size:12px; font-weight:700; text-transform:uppercase; color:var(--azure-hi); flex:1; }
.ghost-pc { font-family:var(--b); font-size:16px; color:var(--azure-hi); background:var(--azure-fog); border:1px solid rgba(0,87,255,0.2); border-radius:20px; padding:1px 10px; }
.ghost-rows { display:flex; flex-direction:column; gap:6px; margin-bottom:8px; }
.ghost-row {
  display:flex; justify-content:space-between; align-items:flex-start; gap:10px;
  background:var(--surface); border:1px solid var(--edge);
  border-radius:var(--rad-sm); padding:10px 12px;
  transition:all 0.25s ease; animation:slideR 0.4s both;
}
.ghost-row:hover { border-color:rgba(0,87,255,0.25); transform:translateX(2px); }
.ghost-bundle { font-family:var(--m); font-size:9px; color:var(--ink); margin-bottom:4px; word-break:break-all; }
.ghost-domains { display:flex; flex-wrap:wrap; gap:3px; }
.ghost-dom-chip { font-family:var(--m); font-size:8px; background:var(--azure-fog); color:var(--azure-hi); border:1px solid rgba(0,87,255,0.15); padding:2px 6px; border-radius:var(--rad-xs); }
.ghost-more { font-family:var(--m); font-size:8px; color:var(--ink-dim); }
.ghost-hits { font-family:var(--b); font-size:16px; color:var(--azure-hi); }
.ghost-warn { font-family:var(--m); font-size:8px; color:var(--ink-dim); margin-top:2px; }
.ghost-hint { font-family:var(--i); font-size:8px; color:var(--ink-dim); padding-top:8px; border-top:1px solid rgba(255,255,255,0.04); line-height:1.5; }

/* ═══════════════════════════════════════════════════════
   IPS SECTION
═══════════════════════════════════════════════════════ */
.ips-panel {
  background:rgba(10,2,6,0.8); border:1px solid rgba(255,23,68,0.18);
  border-radius:var(--rad-lg); padding:16px; margin-bottom:12px;
  animation:fadeUp 0.5s cubic-bezier(.22,1,.36,1) both;
}
.ips-panel-head { display:flex; align-items:center; gap:10px; margin-bottom:12px; }
.ips-ptitle { font-family:var(--r); font-size:12px; font-weight:700; text-transform:uppercase; color:var(--kill); flex:1; }
.ips-pc { font-family:var(--b); font-size:16px; color:var(--kill); background:rgba(255,23,68,0.06); border:1px solid rgba(255,23,68,0.2); border-radius:20px; padding:1px 10px; }
.ips-rows { display:flex; flex-direction:column; gap:6px; margin-bottom:8px; }
.ips-row {
  display:flex; justify-content:space-between; align-items:flex-start; gap:10px;
  border-radius:var(--rad-sm); padding:10px 12px; border:1px solid;
  transition:all 0.25s ease; animation:slideR 0.4s both;
}
.ips-row:hover { transform:translateX(2px); }
.ips-row-critical { background:rgba(255,23,68,0.04); border-color:rgba(255,23,68,0.18); }
.ips-row-vpn      { background:var(--azure-fog); border-color:rgba(0,87,255,0.18); }
.ips-row-developer { background:var(--ok-fog); border-color:rgba(0,229,160,0.15); }
.ips-row-warning  { background:rgba(255,171,0,0.04); border-color:rgba(255,171,0,0.18); }
.ips-cat {
  display:inline-block; font-family:var(--m); font-size:8px; padding:2px 8px;
  border-radius:20px; border:1px solid; margin-bottom:4px;
}
.ips-cat-critical  { color:var(--kill); border-color:rgba(255,23,68,0.25); background:rgba(255,23,68,0.06); }
.ips-cat-vpn       { color:var(--azure-hi); border-color:rgba(0,87,255,0.25); background:var(--azure-fog); }
.ips-cat-developer { color:var(--ok); border-color:rgba(0,229,160,0.25); background:var(--ok-fog); }
.ips-cat-warning   { color:var(--amber); border-color:rgba(255,171,0,0.25); background:var(--amber-fog); }
.ips-bid { font-family:var(--m); font-size:9px; color:var(--ink); word-break:break-all; margin-bottom:2px; }
.ips-reason { font-family:var(--i); font-size:9px; color:var(--ink-mid); line-height:1.4; }
.ips-ver { font-family:var(--m); font-size:8px; color:var(--ink-dim); }
.ips-evt {
  font-family:var(--m); font-size:8px; padding:2px 7px;
  border-radius:var(--rad-xs); border:1px solid;
}
.ips-evt.launched { color:var(--azure-hi); border-color:rgba(0,87,255,0.2); background:var(--azure-fog); }
.ips-evt.installed { color:var(--ok); border-color:rgba(0,229,160,0.2); background:var(--ok-fog); }
.ips-hint { font-family:var(--i); font-size:8px; color:var(--ink-dim); line-height:1.5; }

/* ═══════════════════════════════════════════════════════
   ADVANCED MODULES (5 módulos)
═══════════════════════════════════════════════════════ */
.adv-divider {
  display:flex; align-items:center; gap:12px; margin:28px 0 16px;
  animation:fadeIn 0.6s both;
}
.adv-divider::before, .adv-divider::after { content:''; flex:1; height:1px; background:var(--edge); }
.adv-divider-label {
  font-family:var(--m); font-size:8px; letter-spacing:2.5px;
  color:var(--azure-dim); text-transform:uppercase; white-space:nowrap;
  padding:0 4px;
}

.adv-panel {
  border-radius:var(--rad-lg); overflow:hidden; margin-bottom:10px;
  border:1px solid var(--edge);
  animation:fadeUp 0.5s cubic-bezier(.22,1,.36,1) both;
}
.adv-panel-head {
  display:flex; align-items:center; gap:12px;
  padding:14px 16px;
  background:var(--surface); border-bottom:1px solid var(--edge);
  position:relative; overflow:hidden;
}
.adv-panel-head::after {
  content:''; position:absolute; bottom:0; left:0; right:0; height:1px;
  background:linear-gradient(90deg, var(--azure-dim), transparent);
  opacity:0.4;
}
.adv-panel-icon { font-size:20px; flex-shrink:0; }
.adv-panel-text { flex:1; min-width:0; }
.adv-panel-title { font-family:var(--r); font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:0.5px; color:var(--ink); }
.adv-panel-sub { font-family:var(--m); font-size:8px; color:var(--ink-dim); margin-top:2px; }
.adv-panel-count {
  font-family:var(--b); font-size:18px; flex-shrink:0;
  padding:2px 12px; border-radius:20px; border:1px solid;
}
.adv-cnt-crit { color:var(--kill); border-color:rgba(255,23,68,0.25); background:rgba(255,23,68,0.06); }
.adv-cnt-high { color:var(--azure-hi); border-color:rgba(0,87,255,0.25); background:var(--azure-fog); }
.adv-body { background:var(--deep); }
.adv-row {
  padding:12px 16px; border-bottom:1px solid rgba(255,255,255,0.04);
  transition:background 0.2s;
}
.adv-row:last-child { border-bottom:none; }
.adv-row:hover { background:rgba(0,87,255,0.03); }
.adv-row-top { display:flex; align-items:center; gap:8px; flex-wrap:wrap; margin-bottom:6px; }
.adv-badge {
  font-family:var(--m); font-size:8px; padding:3px 9px;
  border-radius:20px; border:1px solid; flex-shrink:0;
}
.ab-crit { color:var(--kill); border-color:rgba(255,23,68,0.3); background:rgba(255,23,68,0.07); }
.ab-high { color:var(--amber); border-color:rgba(255,109,0,0.3); background:rgba(255,109,0,0.06); }
.ab-med  { color:var(--amber); border-color:rgba(255,171,0,0.25); background:rgba(255,171,0,0.05); }
.adv-bundle { font-family:var(--m); font-size:8px; color:var(--ink-dim); flex:1; word-break:break-all; }
.adv-delta { font-family:var(--m); font-size:9px; color:var(--ink-ghost); flex-shrink:0; }
.adv-domain { font-family:var(--m); font-size:9px; color:var(--azure-hi); margin-bottom:4px; word-break:break-all; }
.adv-meta { font-family:var(--i); font-size:8px; color:var(--ink-dim); line-height:1.6; }
.adv-detail { font-family:var(--i); font-size:8px; color:var(--ink-mid); margin-top:3px; line-height:1.5; }
.adv-detail.crit { color:var(--kill); font-weight:500; }
.adv-foot { font-family:var(--i); font-size:8px; color:var(--ink-dim); padding:10px 16px; background:var(--surface); border-top:1px solid var(--edge); line-height:1.5; }

/* scriptable highlight */
.adv-row-scriptable { background:rgba(255,23,68,0.03); }
.adv-row-scriptable:hover { background:rgba(255,23,68,0.06); }

/* orphan block */
.adv-orphan { padding:12px 16px; border-top:1px solid rgba(255,255,255,0.04); }
.adv-orphan-title { font-family:var(--m); font-size:8px; letter-spacing:0.8px; color:var(--ink-dim); margin-bottom:8px; }
.adv-orphan-chips { display:flex; flex-wrap:wrap; gap:4px; }
.adv-oc { font-family:var(--m); font-size:8px; color:var(--ink-dim); background:var(--ink-ghost); border:1px solid var(--edge); padding:3px 8px; border-radius:var(--rad-xs); }
.adv-oc.cheat { color:var(--kill); border-color:rgba(255,23,68,0.25); background:rgba(255,23,68,0.05); }

/* ═══════════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════════ */
.report-foot {
  text-align:center; padding:24px 20px 32px;
  border-top:1px solid var(--edge);
  font-family:var(--m); font-size:8px; color:var(--ink-dim); letter-spacing:0.5px;
  position:relative;
}
.report-foot::before {
  content:''; display:block; width:60px; height:1px; margin:0 auto 16px;
  background:linear-gradient(90deg, transparent, var(--azure-dim), transparent);
}
.report-foot-brand { color:var(--azure-hi); margin-bottom:4px; font-size:10px; font-weight:500; }
</style>
</head>
<body>
<div class="scanline-wrap"><div class="scanline"></div></div>
<div class="layout">

<!-- ══ HERO ══════════════════════════════════════════════════════ -->
<header class="hero">
  <div class="hero-noise"></div>
  <div class="hero-glow"></div>
  <div class="logo-wrap">
    <div class="logo-eyebrow">Anti-Cheat Scanner · iOS Privacy Report</div>
    <div class="logo-mark">
      <span class="logo-panther">PANTHER</span><span class="logo-ss">SS</span>
    </div>
    <div class="logo-tagline">Panther Apostas · Free Fire · Segurança Mobile</div>
    <div class="logo-bar"></div>
  </div>

  <div class="lang-bar">
    <button class="lang-btn active" id="btn-pt">PT-BR</button>
    <button class="lang-btn" id="btn-en">EN</button>
    <button class="lang-btn" id="btn-es">ES</button>
  </div>

  <div class="hero-file">
    <span class="hero-file-dot"></span>
    <span><strong>${filename}</strong></span>
  </div>

  <div class="hero-grid">
    <div class="hg-card">
      <div class="hg-label">Início</div>
      <div class="hg-val">${fmtDt(firstTs)}</div>
    </div>
    <div class="hg-card">
      <div class="hg-label">Último registro</div>
      <div class="hg-val">${fmtDt(lastTs)}</div>
    </div>
    <div class="hg-card">
      <div class="hg-label">Domínios únicos</div>
      <div class="hg-val blue">${allDomains ? allDomains.length : 0}</div>
    </div>
    <div class="hg-card">
      <div class="hg-label">Conexões totais</div>
      <div class="hg-val blue">${netEntries.length}</div>
    </div>
    `+(ipsMeta && ipsMeta.iosVersion ? '<div class="hg-card'+(ipsMeta.rootsInstalled > 0 ? "" : " hg-card-full")+'"><div class="hg-label">Versão iOS</div><div class="hg-val blue">'+ipsMeta.iosVersion+'</div></div>' : "")+`
    `+(ipsMeta && ipsMeta.rootsInstalled > 0 ? '<div class="hg-card hg-card-warn"><div class="hg-label">⚠ Cert. raiz instalados</div><div class="hg-val warn">'+ipsMeta.rootsInstalled+'</div></div>' : "")+`
  </div>
</header>

<!-- ══ VERDICT ════════════════════════════════════════════════════ -->
<div class="verdict-strip">
  <div class="verdict-icon">${verdictEmoji}</div>
  <div class="verdict-body">
    <div class="verdict-label">Nível de risco</div>
    <div class="verdict-value" style="color:${riskColor}">${riskLabel}</div>
  </div>
  <div class="verdict-ring">
    <svg width="58" height="58" viewBox="0 0 58 58">
      <circle cx="29" cy="29" r="23" fill="none" stroke="rgba(30,52,96,0.6)" stroke-width="5"/>
      <circle cx="29" cy="29" r="23" fill="none" stroke="${riskColor}" stroke-width="5"
        stroke-dasharray="${Math.round(2*3.14159*23)}"
        stroke-dashoffset="${Math.round(2*3.14159*23*(1-riskScore/100))}"
        stroke-linecap="round" style="transition:stroke-dashoffset 1.2s cubic-bezier(.22,1,.36,1)"/>
    </svg>
    <div class="verdict-ring-num" style="color:${riskColor}">${riskScore}</div>
  </div>
</div>

<!-- ══ UPTIME ════════════════════════════════════════════════════ -->
<div class="uptime-rail">
  <div class="uptime-beacon" style="${uptimeWarning ? "background:#ff4444;box-shadow:0 0 8px #ff4444" : "background:var(--azure-hi);box-shadow:0 0 8px var(--azure-hi)"}"></div>
  <div class="uptime-text">Monitorado há <strong>${uptimeStr}</strong></div>
  `+(uptimeWarning ? '<div class="uptime-pill">⚠ MENOS DE 20MIN</div>' : "")+`
</div>

<!-- ══ CONTENT ═══════════════════════════════════════════════════ -->
<main class="content">

  <!-- alertas -->
  ${staleBanner}
  ${ffBanner}
  ${appStoreBanner}

  <!-- score stats -->
  <div class="stat-row">
    <div class="stat-card stat-c">
      <div class="stat-num">${criticalCount}</div>
      <div class="stat-lbl">Crítico</div>
    </div>
    <div class="stat-card stat-h">
      <div class="stat-num">${highCount}</div>
      <div class="stat-lbl">Suspeito</div>
    </div>
    <div class="stat-card stat-m">
      <div class="stat-num">${medCount}</div>
      <div class="stat-lbl">Possível</div>
    </div>
  </div>

  <!-- temporal + top apps -->
  ${temporalSection}
  ${topAppsSection}

  <!-- ── CRÍTICOS ── -->
  `+(criticalCount > 0 ? '<div class="sec-head"><div class="sec-icon sec-ic-crit">⚠</div><div class="sec-text"><div class="sec-title sec-tc">Apps Proxy / Cheat Detectados</div><div class="sec-sub">Aplicativos e infraestrutura conhecida de cheats</div></div><div class="sec-count sec-cc">'+criticalCount+'</div></div>'+criticalCards+'<div class="divider"></div>' : "")+`

  <!-- ── ROOTS + IPS + GHOST ── -->
  `+(highCount > 0 ? rootsWarn+ipsSection+ghostSection+'<div class="sec-head"><div class="sec-icon sec-ic-high">🚫</div><div class="sec-text"><div class="sec-title sec-th">IPs Suspeitos</div><div class="sec-sub">VPS / Hosting / Proxy confirmados</div></div><div class="sec-count sec-ch">'+highCount+'</div></div>' : ipsSection+ghostSection)+`

  `+(medCount > 0 && highCount === 0 ? '<div class="sec-head"><div class="sec-icon sec-ic-med">⚠</div><div class="sec-text"><div class="sec-title sec-tm">IPs Possíveis</div><div class="sec-sub">Infraestrutura cloud / datacenter</div></div><div class="sec-count sec-cm">'+medCount+'</div></div>' : "")+`

  ${cards}

  `+(findings.length > 0 && highCount > 0 && medCount > 0 ? '<div class="divider"></div><div class="sec-head"><div class="sec-icon sec-ic-med">⚠</div><div class="sec-text"><div class="sec-title sec-tm">IPs Possíveis</div><div class="sec-sub">Infraestrutura cloud / datacenter</div></div><div class="sec-count sec-cm">'+medCount+'</div></div>' : "")+`

  <!-- ── MÓDULOS AVANÇADOS ── -->
  `+((ipVsLocSection || shortcutSection || sideloadSection || scriptSection || ghostActivitySection) ? '<div class="adv-divider"><span class="adv-divider-label">🔬 análise avançada · 5 módulos</span></div>'+ipVsLocSection+shortcutSection+sideloadSection+scriptSection+ghostActivitySection : "")+`

</main>

<!-- ══ FOOTER ════════════════════════════════════════════════════ -->
<footer class="report-foot">
  <div class="report-foot-brand">PANTHERSS · ANTI-CHEAT · iOS</div>
  Relatório gerado automaticamente — Panther Apostas<br>
  Arquivo: ${filename}
</footer>

</div><!-- /layout -->

<script>
(function(){
/* ── TRANSLATIONS ── */
var T={pt:{criticalLabel:"Crítico",suspectLabel:"Suspeito",possibleLabel:"Possível",monitoredFor:"Monitorado há",appProxyTitle:"Apps Proxy / Cheat Detectados",appProxySub:"Aplicativos e infraestrutura conhecida de cheats",suspectIPsTitle:"IPs Suspeitos",suspectIPsSub:"VPS / Hosting / Proxy confirmados",possibleIPsTitle:"IPs Possíveis",possibleIPsSub:"Infraestrutura cloud / datacenter",noVPS:"✓ Nenhum IP VPS / Hosting / Proxy detectado.",badgeSuspect:"SUSPEITO",badgePossible:"POSSÍVEL",badgeDomainSuspect:"⚠ DOMÍNIO SUSPEITO",badgeCritical:"⚠ CRÍTICO — APP PROXY/CHEAT",badgeKnownCheat:"⚠ CRÍTICO — CHEAT CONFIRMADO",conns:"conexões",online:"● Online",offline:"● Offline / Sem resposta",staleLabel:"Arquivo possivelmente antigo",staleHint:"Suspeita: arquivo gerado fora do período da partida para esconder atividade.",ffLabel:"Sessões no período",ffSessions:"inicializações registradas no período",ffHint:"Se a última abertura foi após a partida → aplique o W.O!",appStoreLabel:"App Store aberta",appStoreHint:"Se foi após a partida → aplique o W.O!",uptimeLess20:"MENOS DE 20MIN — Relatório pode não cobrir a partida inteira!",riskLevel:"Nível de risco"},en:{criticalLabel:"Critical",suspectLabel:"Suspicious",possibleLabel:"Possible",monitoredFor:"Monitored for",appProxyTitle:"Proxy / Cheat Apps Detected",appProxySub:"Known cheat applications and infrastructure",suspectIPsTitle:"Suspicious IPs",suspectIPsSub:"VPS / Hosting / Confirmed Proxy",possibleIPsTitle:"Possible IPs",possibleIPsSub:"Cloud / datacenter infrastructure",noVPS:"✓ No VPS / Hosting / Proxy IPs detected.",badgeSuspect:"SUSPICIOUS",badgePossible:"POSSIBLE",badgeDomainSuspect:"⚠ SUSPICIOUS DOMAIN",badgeCritical:"⚠ CRITICAL — PROXY/CHEAT APP",badgeKnownCheat:"⚠ CRITICAL — CONFIRMED CHEAT",conns:"connections",online:"● Online",offline:"● Offline / No response",staleLabel:"File possibly outdated",staleHint:"Suspicion: file generated outside the match period to hide activity.",ffLabel:"Sessions in period",ffSessions:"startups recorded in the period",ffHint:"If last opened after the match → apply W.O!",appStoreLabel:"App Store opened",appStoreHint:"If it was after the match → apply W.O!",uptimeLess20:"LESS THAN 20MIN — Report may not cover the entire match!",riskLevel:"Risk level"},es:{criticalLabel:"Crítico",suspectLabel:"Sospechoso",possibleLabel:"Posible",monitoredFor:"Monitoreado hace",appProxyTitle:"Apps Proxy / Cheat Detectadas",appProxySub:"Aplicaciones y cheats conocidas",suspectIPsTitle:"IPs Sospechosas",suspectIPsSub:"VPS / Hosting / Proxy confirmados",possibleIPsTitle:"IPs Posibles",possibleIPsSub:"Infraestructura cloud / datacenter",noVPS:"✓ Ninguna IP VPS / Hosting / Proxy detectada.",badgeSuspect:"SOSPECHOSO",badgePossible:"POSIBLE",badgeDomainSuspect:"⚠ DOMINIO SOSPECHOSO",badgeCritical:"⚠ CRÍTICO — APP PROXY/CHEAT",badgeKnownCheat:"⚠ CRÍTICO — CHEAT CONFIRMADO",conns:"conexiones",online:"● En línea",offline:"● Sin conexión / Sin respuesta",staleLabel:"Archivo posiblemente antiguo",staleHint:"Sospecha: archivo generado fuera del período del partido para ocultar actividad.",ffLabel:"Sesiones en el período",ffSessions:"inicializaciones registradas en el período",ffHint:"Si la última apertura fue después del partido → ¡aplica el W.O!",appStoreLabel:"App Store abierta",appStoreHint:"Si fue después del partido → ¡aplica el W.O!",uptimeLess20:"MENOS DE 20MIN — ¡El informe puede no cubrir toda la partida!",riskLevel:"Nivel de riesgo"}};
function q(s){return Array.from(document.querySelectorAll(s))}
function setLang(lang){
  var t=T[lang];if(!t)return;
  ['pt','en','es'].forEach(function(l){var b=document.getElementById('btn-'+l);if(b)b.classList.toggle('active',l===lang)});
  q('.stat-lbl').forEach(function(el,i){var k=['criticalLabel','suspectLabel','possibleLabel'][i];if(k&&t[k])el.textContent=t[k]});
  q('.uptime-text').forEach(function(el){var s=el.querySelector('strong');if(s){var v=s.textContent;el.innerHTML=t.monitoredFor+' <strong>'+v+'</strong>'}});
  q('.uptime-pill').forEach(function(el){el.textContent='⚠ '+t.uptimeLess20});
  q('.ok-panel').forEach(function(el){el.textContent=t.noVPS});
  q('.stale-label').forEach(function(el){el.textContent=t.staleLabel});
  q('.stale-hint').forEach(function(el){el.textContent=t.staleHint});
  q('.ff-label').forEach(function(el){var v=el.textContent.indexOf('MAX')!==-1?'Free Fire MAX':'Free Fire';el.textContent=v+' — '+t.ffLabel});
  q('.ff-count-label').forEach(function(el){var n=el.textContent.match(/\d+/);if(n)el.textContent=n[0]+' '+t.ffSessions});
  q('.ff-hint').forEach(function(el){el.textContent=t.ffHint});
  q('.alert-store .alert-label').forEach(function(el){el.textContent=t.appStoreLabel});
  q('.alert-store .alert-hint').forEach(function(el){el.textContent=t.appStoreHint});
  q('.verdict-label').forEach(function(el){el.textContent=t.riskLevel});
  q('.sec-head').forEach(function(sh){
    var tt=sh.querySelector('.sec-title'),sb=sh.querySelector('.sec-sub');if(!tt)return;
    if(tt.classList.contains('sec-tc')){tt.textContent=t.appProxyTitle;if(sb)sb.textContent=t.appProxySub}
    else if(tt.classList.contains('sec-th')){tt.textContent=t.suspectIPsTitle;if(sb)sb.textContent=t.suspectIPsSub}
    else if(tt.classList.contains('sec-tm')){tt.textContent=t.possibleIPsTitle;if(sb)sb.textContent=t.possibleIPsSub}
  });
  q('.card').forEach(function(card){
    var badge=card.querySelector('.badge');var connsEl=card.querySelector('.conns');
    if(connsEl){var n=connsEl.textContent.match(/\d+/);if(n)connsEl.textContent=n[0]+' '+t.conns}
    if(badge){if(badge.classList.contains('critical'))badge.innerHTML=badge.getAttribute('data-badge-type')==='known-cheat'?t.badgeKnownCheat:t.badgeCritical;else if(badge.classList.contains('tld-flag'))badge.innerHTML=t.badgeDomainSuspect;else if(badge.classList.contains('high'))badge.textContent=t.badgeSuspect;else if(badge.classList.contains('medium'))badge.textContent=t.badgePossible}
    q('.cval').forEach(function(el){if(el.textContent.indexOf('Online')!==-1||el.textContent.indexOf('Offline')!==-1||el.textContent.indexOf('línea')!==-1){el.innerHTML=el.innerHTML.replace(/●\s*(En línea|Online)/g,t.online).replace(/●\s*(Sin conexión[^<]*|Offline[^<]*)/g,t.offline)}});
  });
}
window.setLang=setLang;
/* ── STAGGER ANIMATIONS ── */
document.addEventListener('DOMContentLoaded',function(){
  var cards=document.querySelectorAll('.card,.adv-row,.tapp-row,.ghost-row,.ips-row');
  cards.forEach(function(el,i){el.style.animationDelay=(i*40)+'ms';});
  /* bar widths */
  document.querySelectorAll('.tapp-fill').forEach(function(el){
    var w=el.getAttribute('data-w')||el.style.width;
    el.style.width='0';
    setTimeout(function(){el.style.width=w;},300);
  });
  function bindBtns(){['pt','en','es'].forEach(function(l){var b=document.getElementById('btn-'+l);if(b)b.addEventListener('click',function(e){e.preventDefault();setLang(l)});})}
  bindBtns();
});
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

  let { findings, netEntries, cheatAppFindings, knownCheatFindings, ghostAppFindings, proxyLoginFindings, temporalAnalysis, topApps, allDomains, ipVsLocationFindings, shortcutFindings, sideloadFindings, scriptURLFindings, ghostActivityResult } = await analyze(entries, [])

  let html = buildHTML(findings, netEntries, cheatAppFindings, knownCheatFindings, ipsFindings, ipsMeta, ghostAppFindings, proxyLoginFindings, temporalAnalysis, topApps, allDomains, filename, { ipVsLocationFindings, shortcutFindings, sideloadFindings, scriptURLFindings, ghostActivityResult })
  await showResult(html)
}

main()

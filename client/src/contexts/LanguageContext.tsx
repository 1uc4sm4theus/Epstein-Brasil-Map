import { createContext, useContext, useState } from "react";

export type Lang = "pt" | "en";

const translations = {
  pt: {
    // Header / Nav
    appTitle: "EPSTEIN BRASIL MAP",
    poweredBy: "Powered by RecomendeMe",
    investigationActive: "INVESTIGAÇÃO ATIVA",
    navMap: "Mapa",
    navGraph: "Grafo",
    navDossier: "Dossiê",
    backToMap: "Voltar ao Mapa",
    initializingSystem: "INICIALIZANDO SISTEMA...",

    // Sidebar
    dbHeader: "DATABASE_V1",
    dbSubtitle: "Acessando Registros Seguros",
    searchPlaceholder: "Buscar localização...",
    filterAll: "Todas",
    filterSmall: "Pequenas",
    recordsCount: "Registros",
    online: "ONLINE",
    exportPdf: "PDF",
    exploreGraph:
      "Explore o grafo de conexões para entender a rede de influência e recrutamento no Brasil.",
    statsExport: "Stats & Exportar",

    // Stats Modal
    dbAnalytics: "ANÁLISE DO BANCO DE DADOS",
    exportPdfBtn: "EXPORTAR PDF",
    distributionByState: "Distribuição por Estado",
    keyMetrics: "Métricas Chave",
    totalLocations: "Total de Locais",
    statesCovered: "Estados Cobertos",
    systemStatus: "Status do Sistema",
    operational: "OPERACIONAL",
    restrictedAccess: "⚠️ ACESSO RESTRITO",
    restrictedText:
      "Estes dados são sensíveis. Distribuição não autorizada é proibida. PDFs gerados são marcados com seu ID de sessão.",

    // Location Drawer
    intelSummary: "Resumo de Inteligência",
    coordinates: "COORDENADAS",
    status: "STATUS",
    activeInvestigation: "INVESTIGAÇÃO ATIVA",
    verifiedSources: "Fontes Verificadas",
    openWikipedia: "Abrir Dossiê Wikipedia",

    // Graph View
    graphTitle: "REDE DE CONEXÕES",
    graphSubtitle: "Mapa de Relacionamentos & Influências",
    classification: "Classificação de Nós",
    mainTarget: "Alvo Principal",
    operators: "Operadores / Rede",
    directAssociates: "Associados Diretos",
    geolocation: "Geolocalização",
    brazilianCities: "Cidades no Brasil",
    intermediaries: "Intermediários",
    localContacts: "Contatos Locais",
    connectionVerified: "Status: Conexão Verificada",

    // Investigation / Dossier View
    dossierTitle: "DOSSIÊ BRASIL",
    dossierSubtitle: "Conexões Epstein & Pistas Anônimas",
    addLead: "ADICIONAR PISTA",
    documentedFacts: "Fatos Documentados",
    communityBoard: "Mural de Colaboração",
    noLeadsYet: "Nenhuma pista registrada ainda",
    encryptionActive: "Encriptação Ativa",
    anonymityGuaranteed: "Anonimato Garantido",
    seeEvidence: "Ver Evidência",
    legalDisclaimer: "Aviso Legal",
    legalText:
      "As informações contidas neste dossiê são baseadas em arquivos públicos e investigações jornalísticas. Este espaço é dedicado à transparência e curadoria humana. Use com responsabilidade.",

    // Documented facts
    fact1: "Recrutamento via Ford Models Brasil (~2016)",
    fact2: "Aproximações com Eike Batista e Lemann",
    fact3: "Caso Natal/RN (Investigado pelo MPF em 2026)",
    fact4: "Projeto na Ilha (Arquiteto Arthur Casas)",
    fact5: "Menções a Lula e Bolsonaro em e-mails",
    factTitle1: "Recrutamento & Agências",
    factTitle2: "Empresários Influentes",
    factTitle3: "Caso Natal (RN)",
    factTitle4: "Projetos de Arquitetura",
    factTitle5: "Nomes Citados",
    factDesc1:
      "Epstein planejou expandir sua rede via Ford Models Brasil (~2016). Discussões sobre compra de agências locais.",
    factDesc2:
      "Registros de tentativas de aproximação com Eike Batista, Jorge Paulo Lemann e Armínio Fraga.",
    factDesc3:
      "Emails envolvendo mulheres brasileiras com pedido de fotos, investigado pelo MPF brasileiro em 2026.",
    factDesc4:
      "Arthur Casas (arquiteto) citado em arquivos por possível projeto na ilha particular.",
    factDesc5:
      "Reinaldo Ávila da Silva, Luma de Oliveira, Luciana Gimenez e Mario Garnero Jr. figuram em arquivos ou listas.",

    // Anonymous lead form
    anonymousChannel: "Canal de Denúncia Anônima",
    anonymousChannelDesc:
      "Sua identidade é protegida por criptografia de ponta-a-ponta. Contribua com a verdade sem riscos.",
    investigativeInfo: "Informação Investigativa",
    infoPlaceholder: "Descreva a conexão, nome ou evento...",
    evidenceLink: "Link da Evidência (URL)",
    evidencePlaceholder: "https://arquivo.com/prova",
    discard: "DESCARTAR",
    sendLead: "ENVIAR PISTA",
    encrypting: "ENCRIPTANDO...",
    registrationDone: "Registro Concluído",
    anonymityProtocol: "Protocolo de Anonimato",
    thankYou:
      "Obrigado por sua coragem. Sua pista será processada por nossa curadoria humana.",
    backToDossier: "VOLTAR AO DOSSIÊ",

    // Dossier button
    dossierBtnTitle: "Dossiê Brasil",
    dossierBtnSubtitle: "Conexões & Pistas",

    // Footer
    footerTagline:
      "Curadoria humana por pessoas reais — Descobertas reais, comunidade em primeiro lugar.",
  },

  en: {
    // Header / Nav
    appTitle: "EPSTEIN BRAZIL MAP",
    poweredBy: "Powered by RecomendeMe",
    investigationActive: "ACTIVE INVESTIGATION",
    navMap: "Map",
    navGraph: "Graph",
    navDossier: "Dossier",
    backToMap: "Back to Map",
    initializingSystem: "INITIALIZING SYSTEM...",

    // Sidebar
    dbHeader: "DATABASE_V1",
    dbSubtitle: "Accessing Secure Records",
    searchPlaceholder: "Search locations...",
    filterAll: "All",
    filterSmall: "Small Cities",
    recordsCount: "Records",
    online: "ONLINE",
    exportPdf: "PDF",
    exploreGraph:
      "Explore the connection graph to understand the influence and recruitment network in Brazil.",
    statsExport: "Stats & Export",

    // Stats Modal
    dbAnalytics: "DATABASE ANALYTICS",
    exportPdfBtn: "EXPORT PDF",
    distributionByState: "Distribution by State",
    keyMetrics: "Key Metrics",
    totalLocations: "Total Locations",
    statesCovered: "States Covered",
    systemStatus: "System Status",
    operational: "OPERATIONAL",
    restrictedAccess: "⚠️ RESTRICTED ACCESS",
    restrictedText:
      "This data is sensitive. Unauthorized distribution is prohibited. Generated PDFs are watermarked with your session ID.",

    // Location Drawer
    intelSummary: "Intel Summary",
    coordinates: "COORDINATES",
    status: "STATUS",
    activeInvestigation: "ACTIVE INVESTIGATION",
    verifiedSources: "Verified Sources",
    openWikipedia: "Open Wikipedia Dossier",

    // Graph View
    graphTitle: "CONNECTION NETWORK",
    graphSubtitle: "Relationship & Influence Map",
    classification: "Node Classification",
    mainTarget: "Main Target",
    operators: "Operators / Network",
    directAssociates: "Direct Associates",
    geolocation: "Geolocation",
    brazilianCities: "Brazilian Cities",
    intermediaries: "Intermediaries",
    localContacts: "Local Contacts",
    connectionVerified: "Status: Verified Connection",

    // Investigation / Dossier View
    dossierTitle: "BRAZIL DOSSIER",
    dossierSubtitle: "Epstein Connections & Anonymous Tips",
    addLead: "ADD TIP",
    documentedFacts: "Documented Facts",
    communityBoard: "Community Collaboration Board",
    noLeadsYet: "No tips registered yet",
    encryptionActive: "Encryption Active",
    anonymityGuaranteed: "Anonymity Guaranteed",
    seeEvidence: "View Evidence",
    legalDisclaimer: "Legal Disclaimer",
    legalText:
      "The information in this dossier is based on public records and journalistic investigations. This space is dedicated to transparency and human curation. Use responsibly.",

    // Documented facts
    fact1: "Recruitment via Ford Models Brazil (~2016)",
    fact2: "Approaches to Eike Batista and Lemann",
    fact3: "Natal/RN Case (Investigated by MPF in 2026)",
    fact4: "Island Project (Architect Arthur Casas)",
    fact5: "Mentions of Lula and Bolsonaro in emails",
    factTitle1: "Recruitment & Agencies",
    factTitle2: "Influential Businessmen",
    factTitle3: "Natal (RN) Case",
    factTitle4: "Architecture Projects",
    factTitle5: "Names Cited",
    factDesc1:
      "Epstein planned to expand his network via Ford Models Brazil (~2016). Discussions about buying local agencies.",
    factDesc2:
      "Records of approach attempts with Eike Batista, Jorge Paulo Lemann and Armínio Fraga.",
    factDesc3:
      "Emails involving Brazilian women requesting photos, investigated by the Brazilian Federal Prosecution in 2026.",
    factDesc4:
      "Arthur Casas (architect) cited in files for a possible project on the private island.",
    factDesc5:
      "Reinaldo Ávila da Silva, Luma de Oliveira, Luciana Gimenez and Mario Garnero Jr. appear in files or lists.",

    // Anonymous lead form
    anonymousChannel: "Anonymous Reporting Channel",
    anonymousChannelDesc:
      "Your identity is protected by end-to-end encryption. Contribute to the truth without risk.",
    investigativeInfo: "Investigative Information",
    infoPlaceholder: "Describe the connection, name or event...",
    evidenceLink: "Evidence Link (URL)",
    evidencePlaceholder: "https://file.com/evidence",
    discard: "DISCARD",
    sendLead: "SUBMIT TIP",
    encrypting: "ENCRYPTING...",
    registrationDone: "Registration Complete",
    anonymityProtocol: "Anonymity Protocol",
    thankYou:
      "Thank you for your courage. Your tip will be processed by our human curation team.",
    backToDossier: "BACK TO DOSSIER",

    // Dossier button
    dossierBtnTitle: "Brazil Dossier",
    dossierBtnSubtitle: "Connections & Tips",

    // Footer
    footerTagline:
      "Human curation by real people — Real discoveries, community first.",
  },
};

export type Translations = (typeof translations)["pt"];

interface LanguageContextType {
  lang: Lang;
  t: Translations;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "pt",
  t: translations.pt,
  toggleLang: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("pt");
  const toggleLang = () => setLang((l) => (l === "pt" ? "en" : "pt"));

  return (
    <LanguageContext.Provider
      value={{ lang, t: translations[lang], toggleLang }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}

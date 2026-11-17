import Confetti from "./confetti";

async function getTotalContents() {
  try {
    const response = await fetch(
      "https://www.tabnews.com.br/api/v1/contents?per_page=1&strategy=new",
      {
        // ISR: reaproveita o resultado por 60s em vez de bater na API a cada request
        next: { revalidate: 60 },
        // evita que uma API lenta segure a renderização da página
        signal: AbortSignal.timeout(3000),
      },
    );

    if (!response.ok) return null;

    const total = Number(response.headers.get("x-pagination-total-rows"));
    return Number.isFinite(total) ? total : null;
  } catch {
    return null;
  }
}

export default async function Home() {
  const totalContents = await getTotalContents();

  return (
    <main className="under-construction">
      <Confetti />
      <h1>Em Construção</h1>
      <p className="description">
        Estamos neste exato momento reconstruindo o TabNews, um lugar na
        internet para quem trabalha com tecnologia e precisa consumir conteúdos
        com valor concreto.
      </p>
      <p className="total">
        {totalContents === null
          ? "Não foi possível carregar o total de conteúdos publicados."
          : `${totalContents.toLocaleString("pt-BR")} conteúdos publicados no TabNews`}
      </p>
      <a href="https://www.tabnews.com.br" target="_blank" rel="noopener noreferrer">
        Acesse o TabNews oficial
      </a>
    </main>
  );
}

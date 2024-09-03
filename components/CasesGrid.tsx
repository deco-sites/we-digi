export interface CaseType {
    title: string; // Rich text
    link: string;
    buttonText: string;
    image: string; // Caminho para a imagem
  }
  
export interface Props {
  cases: CaseType[];
}
  
  export default function CasesGrid({ cases }: Props) {
    return (
      <section class="container mx-auto px-4 py-16">
        <h2 class="text-center text-3xl font-bold mb-8">Conheça alguns de nossos casos:</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cases.map((item, index) => (
            <div key={index} class="relative group">
              <img
                src={item.image}
                alt={item.title}
                class="w-full h-56 object-cover"
              />
              <div class="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity">
                <h3
                  class="text-xl font-bold text-white text-center"
                  dangerouslySetInnerHTML={{ __html: item.title }}
                ></h3>
                <a
                  href={item.link}
                  class="mt-4 btn btn-primary"
                >
                  {item.buttonText}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
  
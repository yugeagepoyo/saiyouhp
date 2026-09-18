import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Lead() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHeading
          variant="standard"
          align="center"
          title="若さの勢いと、確かな品格を。両方を大切にする会社です。"
          description="不動産・建設・解体産廃という異なる事業を、20代を中心とした若い社員たちが連携させながら進めています。挑戦できる環境と、信頼を積み重ねる誠実さ。その両方が、ノーブデンスで働く理由になります。"
        />
      </Container>
    </section>
  );
}

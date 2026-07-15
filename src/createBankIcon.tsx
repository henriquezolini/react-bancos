import * as React from "react";

export interface BankIconProps extends React.SVGProps<SVGSVGElement> {
  /** Largura e altura do ícone. Número = px. Padrão: 48. */
  size?: number | string;
  /** Raio de arredondamento dos cantos (border-radius). Padrão: sem arredondamento. */
  radius?: number | string;
  /** Título acessível anunciado por leitores de tela. Padrão: nome do banco. */
  title?: string;
}

export type BankIconComponent = React.ForwardRefExoticComponent<
  BankIconProps & React.RefAttributes<SVGSVGElement>
>;

export interface BankDef {
  name: string;
  slug: string;
  compe: string | null;
  color: string | null;
  viewBox: string;
  html: string;
}

const escapeXml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Cria um componente de ícone de banco a partir da definição gerada. */
export function createBankIcon(def: BankDef): BankIconComponent {
  const Icon = React.forwardRef<SVGSVGElement, BankIconProps>(function BankIcon(
    { size = 48, radius, title = def.name, style, ...rest },
    ref
  ) {
    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        viewBox={def.viewBox}
        width={size}
        height={size}
        role="img"
        aria-label={title}
        data-bank={def.slug}
        style={radius != null ? { borderRadius: radius, ...style } : style}
        dangerouslySetInnerHTML={{ __html: `<title>${escapeXml(title)}</title>${def.html}` }}
        {...rest}
      />
    );
  });
  Icon.displayName = `BankIcon(${def.slug})`;
  return Icon;
}

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-[712px] flex-col justify-center px-6">
      <p className="display text-[clamp(5rem,16vw,13rem)] leading-[0.85]">404</p>
      <p className="mt-6 max-w-[36ch] text-[15px] text-fg-muted text-pretty">
        This page does not exist. Maybe it moved, maybe it never did.
      </p>
      <p className="mt-8">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-[15px]"
        >
          <span aria-hidden className="transition-transform duration-300 ease-[var(--ease-out-quart)] group-hover:-translate-x-1">
            ←
          </span>
          <span className="bg-gradient-to-r from-fg to-fg bg-[length:100%_1px] bg-bottom bg-no-repeat pb-px transition-[background-size] duration-300 group-hover:bg-[length:0%_1px]">
            Back to the beginning
          </span>
        </Link>
      </p>
    </main>
  );
}

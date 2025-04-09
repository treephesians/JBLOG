import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import Link from "next/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    h1: (props) => <h1 className="text-4xl font-bold mt-8 mb-4" {...props} />,
    h2: (props) => (
      <h2 className="text-3xl font-semibold mt-8 mb-3" {...props} />
    ),
    h3: (props) => (
      <h3 className="text-2xl font-semibold mt-6 mb-3" {...props} />
    ),
    h4: (props) => (
      <h4 className="text-xl font-semibold mt-5 mb-2" {...props} />
    ),
    p: (props) => <p className="my-4 leading-7" {...props} />,
    a: ({ href, ...props }) => {
      if (href && href.startsWith("http")) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
            {...props}
          />
        );
      }
      return href ? (
        <Link
          href={href}
          className="text-blue-600 hover:underline"
          {...props}
        />
      ) : (
        <a className="text-blue-600 hover:underline" {...props} />
      );
    },
    ul: (props) => <ul className="list-disc pl-6 my-4" {...props} />,
    ol: (props) => <ol className="list-decimal pl-6 my-4" {...props} />,
    li: (props) => <li className="mb-1" {...props} />,
    blockquote: (props) => (
      <blockquote
        className="border-l-4 border-gray-300 pl-4 py-1 italic my-4 text-gray-700"
        {...props}
      />
    ),
    img: ({ src, alt, ...props }) => {
      if (src) {
        return (
          <div className="my-6">
            <Image
              src={src}
              alt={alt || ""}
              className="rounded-lg max-w-full h-auto"
              {...props}
            />
            {alt && (
              <p className="text-sm text-gray-500 mt-2 text-center">{alt}</p>
            )}
          </div>
        );
      }
      return null;
    },
    code: (props) => {
      const { children } = props;
      if (typeof children === "string") {
        return (
          <code
            className="bg-gray-100 px-1.5 py-0.5 rounded text-red-600 font-mono text-sm"
            {...props}
          />
        );
      }
      return <code className="font-mono text-sm" {...props} />;
    },
    pre: (props) => (
      <pre
        className="bg-gray-100 p-4 rounded-lg overflow-x-auto my-6 font-mono text-sm"
        {...props}
      />
    ),
    hr: () => <hr className="my-8 border-t border-gray-300" />,
    table: (props) => (
      <div className="overflow-x-auto my-8">
        <table className="min-w-full border-collapse" {...props} />
      </div>
    ),
    th: (props) => (
      <th
        className="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold text-left"
        {...props}
      />
    ),
    td: (props) => (
      <td className="border border-gray-300 px-4 py-2" {...props} />
    ),
  };
}

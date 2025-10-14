import type { SVGProps } from 'react';

export function Medalha(props: SVGProps<SVGSVGElement>) {
	return (<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" {...props}><g fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M10.5 15.5c0-.828.648-1.5 1.446-1.5h.108c.798 0 1.446.672 1.446 1.5s-.648 1.5-1.446 1.5h-.108c-.798 0-1.446-.672-1.446-1.5Z"></path><circle cx={12} cy={15.5} r={6.5}></circle><path strokeLinecap="round" strokeLinejoin="round" d="M9 9.5L5.5 2M15 9.5L18.5 2M15 2l-1 2.5M12.5 9l-3-7"></path></g></svg>);
}
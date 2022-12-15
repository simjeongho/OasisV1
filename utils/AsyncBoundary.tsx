import { ComponentProps } from 'react';
import ErrorBoundary from './ErrorBoundary';
import SSRSafeSuspense from './SSRSafeSuspense';

type ErrorBoundaryProps = ComponentProps<typeof ErrorBoundary>;

interface Props extends Omit<ErrorBoundaryProps, 'fallback'> {
	pendingFallback: ComponentProps<typeof SSRSafeSuspense>['fallback'];
	rejectedFallback: ErrorBoundaryProps['fallback'];
}

function AsyncBoundary({ pendingFallback, rejectedFallback, children, ...errorBoundaryProps }: Props) {
	return (
		<ErrorBoundary fallback={rejectedFallback} {...errorBoundaryProps}>
			<SSRSafeSuspense fallback={pendingFallback}>{children}</SSRSafeSuspense>
		</ErrorBoundary>
	);
}

export default AsyncBoundary;

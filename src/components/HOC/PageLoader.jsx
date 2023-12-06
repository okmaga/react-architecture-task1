import { lazy, Suspense } from "react";
import ErrorBoundary from "./ErrorBoundary";
import PrivateRoute from "./PrivateRoute";

const PageLoader = ({ page, isPrivate }) => {
  const Page = lazy(() =>
    import(`../../pages/${page}`).then((module) => ({
      default: module[page]
    }))
  );

  if (isPrivate) {
    return (
      <ErrorBoundary>
        <PrivateRoute>
          <Suspense fallback={<p>Loading...</p>}>
            <Page />
          </Suspense>
        </PrivateRoute>
      </ErrorBoundary>
    );
  }
  return (
    <ErrorBoundary>
      <Suspense fallback={<p>Loading...</p>}>
        <Page />
      </Suspense>
    </ErrorBoundary>
  );
};

export default PageLoader;

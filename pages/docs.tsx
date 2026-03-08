import dynamic from "next/dynamic";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false });

import "swagger-ui-react/swagger-ui.css";

export default function DocsPage() {
  return (
    <div style={{ padding: 20 }}>
      <SwaggerUI url="/api/docs" />
    </div>
  );
}
import { Button, Tooltip } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useState } from "react";
import { exportLocalStorageToURL } from "../../helpers/url_export_import_data";


export const ShareButton = () => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const compressed = exportLocalStorageToURL();
    // Always link to the technical-datasheet page
    const base = `${window.location.origin}${window.location.pathname}#/technical-datasheet`;
    const shareUrl = `${base}?data=${compressed}`;

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("❌ Failed to copy URL:", err);
      alert("Could not copy the link. Check clipboard permissions.");
    }
  };

  return (
    <Tooltip title={copied ? "Copied!" : "Share this datasheet"}>
      <Button
        variant="contained"
        color="primary"
        startIcon={copied ? <ContentCopyIcon /> : <ShareIcon />}
        onClick={handleShare}
      >
        {copied ? "Copied!" : "Share"}
      </Button>
    </Tooltip>
  );
};

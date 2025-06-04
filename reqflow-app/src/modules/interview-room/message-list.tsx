import type { IChatMessage } from "@/modules/interview-room/actions/types";

import { alpha } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// ----------------------------------------------------------------------
import { useMessage } from "@/hooks/use-message";
import { fToNow } from "../../../utils/format-time";

type Props = {
  message: IChatMessage;
};

export function ChatMessageItem({ message }: Props) {
  const { me, senderDetails, hasImage } = useMessage({
    message,
    currentUserId: `user`,
  });

  const { firstName, avatarUrl } = senderDetails;

  const { body, createdAt } = message;

  const renderInfo = (
    <Typography
      noWrap
      variant="caption"
      sx={{ mb: 1, color: "text.disabled", ...(!me && { mr: "auto" }) }}
    >
      {!me && `${firstName}, `}
      {fToNow(createdAt)}
    </Typography>
  );

  const renderBody = (
    <Stack
      sx={{
        p: 1.5,
        minWidth: 48,
        maxWidth: 320,
        borderRadius: 2,
        typography: "body2",
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.5),
        whiteSpace: "pre-line",
        wordBreak: "break-word",
        ...(me && { color: "grey.900", bgcolor: "primary.main" }),
      }}
    >
      {body}
    </Stack>
  );

  return (
    <Stack
      direction="row"
      justifyContent={me ? "flex-end" : "unset"}
      sx={{ mb: 5 }}
    >
      {!me && (
        <Avatar
          alt={firstName}
          src={"/image/avatar-1.png"}
          sx={{ width: 32, height: 32, mr: 2 }}
        />
      )}

      <Stack alignItems={me ? "flex-end" : "flex-start"}>
        {renderInfo}

        <Stack
          direction="row"
          alignItems="center"
          sx={{
            position: "relative",
            "&:hover": { "& .message-actions": { opacity: 1 } },
          }}
        >
          {renderBody}
        </Stack>
      </Stack>
    </Stack>
  );
}

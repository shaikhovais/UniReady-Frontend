import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { ArrowBackRounded } from "@mui/icons-material";

import { Box, Button, Divider, Typography } from "@mui/material";

import CommonPageLayout from "../../../common/CommonPageLayout";

import PageLoader from "../../../../../components/Loader";

import {
  getResourceById,
  toggleSaveResource,
  submitResourceFeedback,
} from "../../../../../services/features/resourceService";

import type {
  ArticleDetail,
  ArticleFeedbackRequest,
} from "../../../../../types/features/resource";

import ArticleHeader from "./ArticleHeader";
import ArticleContentRenderer from "./ArticleContentRendered";
import ArticleFeedbackSection from "./ArticleFeedbackSection";

const ArticleDetailPage = () => {
  const { articleId } = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState<ArticleDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [showLoginError, setShowLoginError] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, [articleId]);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!articleId) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);

        const response = await getResourceById(Number(articleId));

        setArticle(response.article);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [articleId]);

  const handleSave = async () => {
    if (!article) return;

    const token = localStorage.getItem("uniready_token");

    if (!token) {
      setFeedbackMessage("");
      setShowLoginError(true);
      return;
    }

    try {
      await toggleSaveResource(article.id);

      setShowLoginError(false);

      setArticle((prev) =>
        prev
          ? {
              ...prev,
              isSaved: !prev.isSaved,
            }
          : prev,
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleHelpful = async (isHelpful: boolean) => {
    if (!article) return;

    const token = localStorage.getItem("uniready_token");

    if (!token) {
      setFeedbackMessage("");
      setShowLoginError(true);
      return;
    }

    setShowLoginError(false);
    setFeedbackMessage("");

    const payload: ArticleFeedbackRequest = {
      articleId: article.id,
      isHelpful,
    };

    try {
      const response = await submitResourceFeedback(article.id, payload);

      setArticle((prev) =>
        prev
          ? {
              ...prev,
              isHelpful,
            }
          : prev,
      );

      setFeedbackMessage(response.message);
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <CommonPageLayout>
        <PageLoader />
      </CommonPageLayout>
    );
  }

  if (!article) {
    return (
      <CommonPageLayout>
        <Box
          sx={{
            minHeight: "60vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: 14,
              color: "#64748B",
            }}
          >
            Article could not be found.
          </Typography>
        </Box>
      </CommonPageLayout>
    );
  }

  return (
    <CommonPageLayout>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#F7F9F7",
          py: { xs: 1, md: 2 },
        }}
      >
        <Box
          sx={{
            maxWidth: 1100,
            mx: "auto",
            px: { xs: 0, sm: 1 },
          }}
        >
          <Button
            startIcon={<ArrowBackRounded sx={{ fontSize: 18 }} />}
            onClick={() => navigate(-1)}
            sx={{
              textTransform: "none",
              mb: { xs: 1.5, md: 2 },
              px: 0.5,
              fontSize: 13,
              fontWeight: 700,
              color: "#1F733E",

              "&:hover": {
                backgroundColor: "transparent",
                color: "#155D31",
              },
            }}
          >
            Back
          </Button>

          <Box
            sx={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E5EBE7",
              borderRadius: { xs: "16px", md: "20px" },
              overflow: "hidden",
              boxShadow: "0 4px 20px rgba(17, 24, 39, 0.025)",
            }}
          >
            <ArticleHeader article={article} onToggleSave={handleSave} />

            <Box
              sx={{
                px: { xs: 2, sm: 3, md: 4 },
                py: { xs: 2.5, md: 4.5 },
              }}
            >
              <ArticleContentRenderer blocks={article.contentBlocks} />
            </Box>

            <Divider sx={{ borderColor: "#EEF2F7" }} />

            <ArticleFeedbackSection
              isHelpful={article.isHelpful}
              showLoginError={showLoginError}
              feedbackMessage={feedbackMessage}
              onFeedback={handleHelpful}
            />
          </Box>
        </Box>
      </Box>
    </CommonPageLayout>
  );
};

export default ArticleDetailPage;

import { useSession, signIn } from "next-auth/client";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import { api } from "../../services/api";
import { getStripeJs } from "../../services/stripe-js";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";

export function SubscribeButton() {
  const [loading, setLoading] = useState(false);
  const [session] = useSession();
  const router = useRouter();

  async function handleSubscribe() {
    if (!session) {
      signIn("github");
      return;
    }

    if (session.activeSubscription) {
      router.push("/publicacoes");
      return;
    }

    try {
      setLoading(true);
      const response = await api.post("/subscribe");

      const { sessionId } = response.data;

      const stripe = await getStripeJs();

      await stripe.redirectToCheckout({ sessionId });
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      {loading ? "Carregando" : "Inscreva-se"}
      {loading && (
        <CircularProgress
          color="inherit"
          style={{ marginLeft: ".5rem" }}
          size={25}
        />
      )}
    </button>
  );
}

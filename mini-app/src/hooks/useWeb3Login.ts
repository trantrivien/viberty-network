import { useAccount, useSignMessage } from "wagmi";
import { useAuthStore } from "@/store/authStore";
import { getLoginPayload, verifyLogin } from "@/lib/services/authService";

export function useWeb3Login() {
  const { address, chain } = useAccount();
  const { signMessageAsync } = useSignMessage();

  const login = async () => {
    if (!address || !chain?.id) throw new Error("Wallet not connected");
    const payload = await getLoginPayload(address, chain.id);

    const signature = await signMessageAsync({ message: payload.message });

    const res = await verifyLogin({ payload, signature });

    // B4: Cập nhật store nếu cần
    useAuthStore.getState().setToken(res.token);
    const userInfo = await fetch("/api/user/me").then(r => r.json());
    useAuthStore.getState().setUser(userInfo);
  };

  return { login };
}

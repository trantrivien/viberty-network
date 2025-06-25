import { post, get } from "@/lib/api/request";
import { useAuthStore } from "@/store/authStore";

// Lấy payload từ server để ký
export async function getLoginPayload(address: string, chainId?: number) {
  return await get("/auth/login", {
    address,
    chainId: chainId?.toString(),
  });
}

// Gửi payload + chữ ký để đăng nhập
export async function verifyLogin(signedPayload: { payload: any; signature: string }) {
  const res = await post("/web3-auth/login", signedPayload);

  const token = res.token;

  const user = await get("/user/me");

  return res;
}

// Kiểm tra login
export async function isLoggedIn() {
  try {
    const res = await get("/auth/isLoggedIn");
    return res === true;
  } catch (err) {
    return false;
  }
}

// Đăng xuất
export async function logout() {
  await post("/auth/logout");
  if (typeof window !== "undefined") {
    window.location.href = "/login";
  }
}

// Refresh token
export async function refreshAccessToken() {
  const res = await post("/auth/refresh");

}



export async function registerAndLogin(address: string, chainId?: number) {
  const username = `user-${address.slice(2, 8)}`;
  const referral_code = '';
  const referred_by = ''; 

  try {
    // 1. Gọi API đăng ký
    await post('/auth/register', {
      wallet_address: address,
      username,
      referral_code,
      referred_by,
    });
  } catch (err: any) {
    if (!err.message.includes('409')) {
      throw err;
    }
  }

  const loginResult = await post('/auth/login', {
    wallet_address: address,
  });

  return loginResult; // return JWT hoặc user info
}


export async function connectUser(wallet_address: string, chain_id: number,referred_by?:string ) {
  const response = await post('/auth/connect', { wallet_address, chain_id , referred_by });

  const { access_token, refresh_token, user, items, tasks, sessions } = response.data;

  localStorage.setItem('access_token', access_token);
  localStorage.setItem('refresh_token', refresh_token);
  useAuthStore.getState().setAuth({ access_token, refresh_token, user, items, tasks, sessions });

  return {
    user,
    access_token,
    refresh_token,
    items,
    tasks,
    sessions,
  };
}
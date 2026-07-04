/**
 * authApi.js — All auth, account, order, cart, review, and engagement API calls.
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// ---------------------------------------------------------------------------
// Core fetch helper
// ---------------------------------------------------------------------------
async function authFetch(url, options = {}) {
  const { headers, ...restOptions } = options;

  const response = await fetch(url, {
    ...restOptions,
    headers: {
      "Content-Type": "application/json",
      ...(headers || {}),
    },
  });

  let data = null;
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    data = await response.json();
  }

  return { ok: response.ok, status: response.status, data };
}

function bearerHeaders(accessToken) {
  return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
}

// ---------------------------------------------------------------------------
// AUTH
// ---------------------------------------------------------------------------

export async function apiLogin(email, password) {
  return authFetch(`${BASE_URL}/auth/login/`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function apiRegister({ username, email, password, full_name, phone_number = "" }) {
  return authFetch(`${BASE_URL}/auth/register/`, {
    method: "POST",
    body: JSON.stringify({ username, email, password, full_name, phone_number }),
  });
}

export async function apiRefreshToken(refreshToken) {
  return authFetch(`${BASE_URL}/auth/refresh/`, {
    method: "POST",
    body: JSON.stringify({ refresh: refreshToken }),
  });
}

export async function apiLogout(accessToken, refreshToken) {
  return authFetch(`${BASE_URL}/auth/logout/`, {
    method: "POST",
    headers: bearerHeaders(accessToken),
    body: JSON.stringify({ refresh: refreshToken }),
  });
}

export async function apiGoogleLogin(access_token) {
  return authFetch(`${BASE_URL}/auth/google/`, {
    method: "POST",
    body: JSON.stringify({ access_token }),
  });
}

export async function apiChangePassword(accessToken, old_password, new_password) {
  return authFetch(`${BASE_URL}/auth/change-password/`, {
    method: "POST",
    headers: bearerHeaders(accessToken),
    body: JSON.stringify({ old_password, new_password }),
  });
}

export async function apiForgotPassword(email) {
  return authFetch(`${BASE_URL}/auth/forgot-password/`, {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export async function apiResetPassword({ uid, token, new_password }) {
  return authFetch(`${BASE_URL}/auth/reset-password/`, {
    method: "POST",
    body: JSON.stringify({ uid, token, new_password }),
  });
}

export async function apiVerifyEmail({ uid, token }) {
  return authFetch(`${BASE_URL}/auth/verify-email/`, {
    method: "POST",
    body: JSON.stringify({ uid, token }),
  });
}

export async function apiResendVerification(accessToken) {
  return authFetch(`${BASE_URL}/auth/resend-verification-email/`, {
    method: "POST",
    headers: bearerHeaders(accessToken),
    body: JSON.stringify({}),
  });
}

// ---------------------------------------------------------------------------
// CUSTOMER PROFILE  — GET /customers/me/
// Returns: { id, user, username, name, first_name, last_name, email, phone_number,
//            avatar, social_avatar_url, is_email_verified, addresses, ... }
// ---------------------------------------------------------------------------

export async function apiGetCustomer(accessToken) {
  return authFetch(`${BASE_URL}/customers/me/`, {
    method: "GET",
    headers: bearerHeaders(accessToken),
  });
}

export async function apiUpdateCustomer(accessToken, customerId, data) {
  return authFetch(`${BASE_URL}/customers/${customerId}/`, {
    method: "PATCH",
    headers: bearerHeaders(accessToken),
    body: JSON.stringify(data),
  });
}

// ---------------------------------------------------------------------------
// ADDRESSES  — /addresses/
// ---------------------------------------------------------------------------

export async function apiGetAddresses(accessToken) {
  return authFetch(`${BASE_URL}/addresses/`, {
    method: "GET",
    headers: bearerHeaders(accessToken),
  });
}

// ---------------------------------------------------------------------------
// Locations API
// ---------------------------------------------------------------------------
export async function apiGetDivisions() {
  return authFetch(`${BASE_URL}/divisions/`, {
    method: "GET",
  });
}

export async function apiGetDistricts(divisionId) {
  const url = divisionId ? `${BASE_URL}/districts/?division_id=${divisionId}` : `${BASE_URL}/districts/`;
  return authFetch(url, {
    method: "GET",
  });
}

export async function apiGetSubDistricts(districtId) {
  const url = districtId ? `${BASE_URL}/sub-districts/?district_id=${districtId}` : `${BASE_URL}/sub-districts/`;
  return authFetch(url, {
    method: "GET",
  });
}

export async function apiAddAddress(accessToken, data) {
  return authFetch(`${BASE_URL}/addresses/`, {
    method: "POST",
    headers: bearerHeaders(accessToken),
    body: JSON.stringify(data),
  });
}

export async function apiUpdateAddress(accessToken, addressId, data) {
  return authFetch(`${BASE_URL}/addresses/${addressId}/`, {
    method: "PUT",
    headers: bearerHeaders(accessToken),
    body: JSON.stringify(data),
  });
}

export async function apiDeleteAddress(accessToken, addressId) {
  return authFetch(`${BASE_URL}/addresses/${addressId}/`, {
    method: "DELETE",
    headers: bearerHeaders(accessToken),
  });
}

// ---------------------------------------------------------------------------
// CART  — GET /cart/ returns { id, items: [...], created_at }
//          POST /cart-items/ → { product_id, variant_id?, quantity }
//          PATCH /cart-items/{id}/ → { quantity }
//          DELETE /cart-items/{id}/
// ---------------------------------------------------------------------------

export async function apiGetCart(accessToken) {
  return authFetch(`${BASE_URL}/cart/`, {
    method: "GET",
    headers: bearerHeaders(accessToken),
  });
}

export async function apiAddCartItem(accessToken, { product_id, variant_id, quantity = 1 }) {
  const body = { product_id, quantity };
  if (variant_id) body.variant_id = variant_id;
  return authFetch(`${BASE_URL}/cart-items/`, {
    method: "POST",
    headers: bearerHeaders(accessToken),
    body: JSON.stringify(body),
  });
}

export async function apiUpdateCartItem(accessToken, cartItemId, quantity) {
  return authFetch(`${BASE_URL}/cart-items/${cartItemId}/`, {
    method: "PATCH",
    headers: bearerHeaders(accessToken),
    body: JSON.stringify({ quantity }),
  });
}

export async function apiDeleteCartItem(accessToken, cartItemId) {
  return authFetch(`${BASE_URL}/cart-items/${cartItemId}/`, {
    method: "DELETE",
    headers: bearerHeaders(accessToken),
  });
}

export async function apiClearCart(accessToken) {
  return authFetch(`${BASE_URL}/cart/clear/`, {
    method: "DELETE",
    headers: bearerHeaders(accessToken),
  });
}

// ---------------------------------------------------------------------------
// ORDERS  — GET /orders/ (user's orders)
//            POST /orders/ → full order payload (uses cart items automatically)
// ---------------------------------------------------------------------------

export async function apiGetOrders(accessToken) {
  return authFetch(`${BASE_URL}/orders/`, {
    method: "GET",
    headers: bearerHeaders(accessToken),
  });
}

/** Create order from cart. Payload: { address_id?, full_name, phone, email,
 *  shipping_address, division, district, sub_district?,
 *  payment_method, coupon_code?, save_address? } */
export async function apiCreateOrder(accessToken, payload) {
  return authFetch(`${BASE_URL}/orders/`, {
    method: "POST",
    headers: bearerHeaders(accessToken),
    body: JSON.stringify(payload),
  });
}

/** POST /orders/validate-coupon/ → { code, discount_amount, discount_type, ... } */
export async function apiValidateCoupon(code, subtotal) {
  return authFetch(`${BASE_URL}/orders/validate-coupon/`, {
    method: "POST",
    body: JSON.stringify({ code, subtotal }),
  });
}

// ---------------------------------------------------------------------------
// REVIEWS  — GET /reviews/?product={id} , POST /reviews/
// ---------------------------------------------------------------------------

export async function apiGetReviews(productId) {
  return authFetch(`${BASE_URL}/reviews/?product=${productId}`, {
    method: "GET",
  });
}

/** POST /reviews/ — multipart/form-data when images attached, otherwise JSON */
export async function apiCreateReview(accessToken, formData) {
  // FormData upload — don't set Content-Type (browser adds boundary)
  const response = await fetch(`${BASE_URL}/reviews/`, {
    method: "POST",
    headers: bearerHeaders(accessToken),
    body: formData,
  });
  const contentType = response.headers.get("content-type") || "";
  const data = contentType.includes("application/json") ? await response.json() : null;
  return { ok: response.ok, status: response.status, data };
}

/** GET /questions/?product={id} */
export async function apiGetQuestions(productId) {
  return authFetch(`${BASE_URL}/questions/?product=${productId}`, {
    method: "GET",
  });
}

/** POST /questions/ → { product, question } */
export async function apiCreateQuestion(accessToken, { product, question }) {
  return authFetch(`${BASE_URL}/questions/`, {
    method: "POST",
    headers: bearerHeaders(accessToken),
    body: JSON.stringify({ product, question }),
  });
}

// ---------------------------------------------------------------------------
// CONTACT  — POST /contact/
// ---------------------------------------------------------------------------

export async function apiSendContact({ name, email, subject, message }) {
  return authFetch(`${BASE_URL}/contact/`, {
    method: "POST",
    body: JSON.stringify({ name, email, subject, message }),
  });
}

// ---------------------------------------------------------------------------
// SUBSCRIBE  — POST /subscribe/
// ---------------------------------------------------------------------------

export async function apiSubscribe(email) {
  return authFetch(`${BASE_URL}/subscribe/`, {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

// ---------------------------------------------------------------------------
// NOTIFICATIONS  — GET /notifications/ (auth required)
// ---------------------------------------------------------------------------

export async function apiGetNotifications(accessToken) {
  return authFetch(`${BASE_URL}/notifications/`, {
    method: "GET",
    headers: bearerHeaders(accessToken),
  });
}

export async function apiMarkNotificationRead(accessToken, notifId) {
  return authFetch(`${BASE_URL}/notifications/${notifId}/mark_read/`, {
    method: "POST",
    headers: bearerHeaders(accessToken),
    body: JSON.stringify({}),
  });
}

export async function apiMarkAllNotificationsRead(accessToken) {
  return authFetch(`${BASE_URL}/notifications/mark_all_read/`, {
    method: "POST",
    headers: bearerHeaders(accessToken),
    body: JSON.stringify({}),
  });
}

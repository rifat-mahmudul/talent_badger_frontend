import { getAllBlog, getBlog, getSingleBlog } from "@/lib/blog";
import { contactUs } from "@/lib/contactus";
import { getAllFaq } from "@/lib/faq";
import { getAllIndustries } from "@/lib/industries";
import { changePassword, getProfile, updateAvatar, updateProfileInfo } from "@/lib/profileInfo";
import { getAllService } from "@/lib/service";
import { BlogResponse, SingelBlogResponse } from "@/types/blog";
import { FaqResponse } from "@/types/faq";
import { IndustryResponse } from "@/types/ndustries";
import { ServicesResponse } from "@/types/service";
import { ProfileUpdatePayload, UserProfileResponse } from "@/types/userDataType";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { toast } from "sonner";


export function useContactUs(
    onSuccessCallback?: () => void
) {
    return useMutation({
        mutationFn: (payload: { firstName: string, lastName: string, emailAddress: string, message: string, phoneNumber: string }) => contactUs(payload),
        onSuccess: (data) => {
            toast.success(data?.message || "Password updated successfully");
            if (onSuccessCallback) onSuccessCallback();
        },
        onError: (error: unknown) => {
            if (error instanceof Error) toast.error(error.message || "Update failed");
            else toast.error("Update failed");
        },
    });
}

export function useGetBlog() {
    return useQuery<BlogResponse>({
        queryKey: ["recentblog"],
        queryFn: () => {
            return getBlog()
        },
    })
}

export function useGetAllBlog(page?: number, limit?: number) {
    return useQuery<BlogResponse>({
        queryKey: ["blog", page, limit],
        queryFn: () => {
            return getAllBlog({ page, limit })
        },
    })
}

export function useGetSingelBlog(id: string) {
    return useQuery<SingelBlogResponse>({
        queryKey: ["blog", id],
        queryFn: () => {
            return getSingleBlog(id)
        },
    })
}

export function useProfileQuery(token: string | undefined) {
    return useQuery<UserProfileResponse>({
        queryKey: ["me"],
        queryFn: () => {
            if (!token) throw new Error("Token is missing")
            return getProfile(token)
        },
        enabled: !!token,
    })
}

export function useProfileInfoUpdate(token: string, onSuccessCallback?: () => void) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: ProfileUpdatePayload) => updateProfileInfo(token, payload),
        onSuccess: () => {
            toast.success("Profile updated successfully");
            queryClient.invalidateQueries({ queryKey: ["me"] });
            if (onSuccessCallback) onSuccessCallback();
        },
        onError: (error: unknown) => {
            if (error instanceof Error) toast.error(error.message || "Update failed");
            else toast.error("Update failed");
        },
    });
}

export function useProfileAvatarUpdate(token: string, onSuccessCallback?: () => void) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: { avatar: File }) => updateAvatar(token, payload),
        onSuccess: () => {
            toast.success("Profile updated successfully");
            queryClient.invalidateQueries({ queryKey: ["me"] });
            if (onSuccessCallback) onSuccessCallback();
        },
        onError: (error: unknown) => {
            if (error instanceof Error) toast.error(error.message || "Update failed");
            else toast.error("Update failed");
        },
    });
}

export function useGetAllFaq() {
    return useQuery<FaqResponse>({
        queryKey: ["faq"],
        queryFn: () => {
            return getAllFaq()
        },
    })
}

export function useChnagePassword(
    token: string, onSuccessCallback?: () => void) {
    return useMutation({
        mutationFn: (payload: { oldPassword: string; newPassword: string }) =>
            changePassword(token, payload),
        onSuccess: (data) => {
            toast.success(data?.message || "Password updated successfully");
            signOut({ callbackUrl: "/" });
            if (onSuccessCallback) onSuccessCallback();
        },
        onError: (error: unknown) => {
            if (error instanceof Error) toast.error(error.message || "Update failed");
            else toast.error("Update failed");
        },
    });
}

export function useGetAllService() {
    return useQuery<ServicesResponse>({
        queryKey: ["service"],
        queryFn: () => {
            return getAllService()
        },
    })
}

export function useGetAllIndustry() {
    return useQuery<IndustryResponse>({
        queryKey: ["industry"],
        queryFn: () => {
            return getAllIndustries()
        },
    })
}

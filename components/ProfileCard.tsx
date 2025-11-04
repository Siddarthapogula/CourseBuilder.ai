"use client";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Check, Edit, X } from "lucide-react";
import { useState, useTransition, useEffect } from "react";
import { updateUser } from "@/actions/user";

export default function ProfileCard({ userData, setUserData }: any) {
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [backUpData, setBackUpData] = useState(null);
  const [updateProfileData, setUpdateProfileData] = useState({
    id: userData.id,
    name: userData.name,
    image: userData.image,
    about: userData.about,
    organization: userData.organization,
  });

  useEffect(() => {
    if (userData) {
      setUpdateProfileData({
        id: userData.id,
        name: userData.name,
        image: userData.image,
        about: userData.about,
        organization: userData.organization,
      });
    }
  }, [userData]);

  const handleUpdateClick = () => {
    setIsEditing(true);
    setBackUpData(userData);
    setUpdateProfileData({
      id: userData.id,
      name: userData.name,
      image: userData.image,
      about: userData.about,
      organization: userData.organization,
    });
  };
  const handleCancelUpdateClick = () => {
    setIsEditing(false);
    setUserData(backUpData);
    setUpdateProfileData({
      id: userData.id,
      name: userData.name,
      image: userData.image,
      about: userData.about,
      organization: userData.organization,
    });
    setBackUpData(null);
  };
  const handleUpdateSubmitClick = async () => {
    startTransition(async () => {
      try {
        const { data } = await updateUser(updateProfileData);
        setUpdateProfileData(data);
        setUserData(data);
      } catch (e: any) {
        alert("error while updating profile" + e.message);
      }
      setIsEditing(false);
    });
  };
  return (
    <Card className=" mx-auto w-full max-w-3xl space-y-2 p-4">
      <CardHeader>
        <CardTitle className=" text-2xl font-medium">Profile</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className=" flex justify-center">
          <Image
            className=" w-24 h-24 rounded-full border"
            alt="user"
            src={updateProfileData?.image || ""}
            width={96}
            height={96}
          />
        </div>
        <div className=" grid grid-cols-1 md:grid-cols-3 items-center gap-4">
          <Label>Name </Label>
          <Input
            onChange={(e) => {
              setUpdateProfileData((prev) => ({
                ...prev,
                name: e.target.value,
              }));
            }}
            className=" bg-muted md:col-span-2"
            disabled={!isEditing || isPending}
            value={updateProfileData?.name || ""}
          />
        </div>

        <div className=" grid grid-cols-1 md:grid-cols-3 items-center gap-4">
          <Label>Email </Label>
          <Textarea
            className="resize-none bg-muted md:col-span-2"
            disabled={true}
            placeholder={userData.email}
          />
        </div>

        <div className=" grid grid-cols-1 md:grid-cols-3 items-center gap-4">
          <Label>Organization </Label>
          <Input
            onChange={(e) => {
              setUpdateProfileData((prev) => ({
                ...prev,
                organization: e.target.value,
              }));
            }}
            className=" bg-muted md:col-span-2"
            disabled={!isEditing || isPending}
            value={updateProfileData?.organization || ""}
          />
        </div>

        <div className=" grid grid-cols-1 md:grid-cols-3 items-start gap-4">
          <Label>About</Label>
          <Textarea
            onChange={(e) => {
              setUpdateProfileData((prev) => ({
                ...prev,
                about: e.target.value,
              }));
            }}
            className=" bg-muted md:col-span-2"
            disabled={!isEditing || isPending}
            value={updateProfileData?.about || ""}
          />
        </div>
      </CardContent>
      <CardFooter className=" flex justify-end">
        {isEditing ? (
          <div className=" flex gap-2">
            <Button onClick={handleCancelUpdateClick} disabled={isPending}>
              <X className=" w-4 h-4 " />
            </Button>
            <Button onClick={handleUpdateSubmitClick} disabled={isPending}>
              <Check className=" w-4 h-4" />
            </Button>
          </div>
        ) : (
          <Button onClick={handleUpdateClick}>
            <Edit className=" w-4 h-4 mr-2" />
            <span>Update</span>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

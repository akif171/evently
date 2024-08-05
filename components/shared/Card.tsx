import { IEvent } from "@/lib/database/models/event.model";
import { formatDateTime } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { DeleteConfirmation } from "./DeleteConfirmation";

type CardProps = {
  event: IEvent;
  hasOrderLink: boolean;
  hidePrice: boolean;
};

const Card = ({ event, hasOrderLink, hidePrice }: CardProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const isEventCreator = userId === event.organizer._id.toString();

  return (
    <div className="flex flex-col group relative w-full min-h-[380px] max-h-[400px] overflow-hidden bg-white rounded-xl shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
      <Link
        href={`/events/${event._id}`}
        style={{ backgroundImage: `url(${event.imageUrl})` }}
        className="flex-center flex-grow bg-cover bg-center bg-gray-50 text-gray-500"
      />

      {/* IS CREATOR OF THE EVENT */}

      {isEventCreator && !hidePrice && (
        <div className="flex flex-col right-2 top-2 rounded-xl absolute transition-all gap-4 p-3 shadow-sm bg-white">
          <Link href={`/events/${event._id}/update`}>
            <Image
              src="/assets/icons/edit.svg"
              alt="edit"
              width={20}
              height={20}
            />
          </Link>
          <DeleteConfirmation eventId={event._id} />
        </div>
      )}

      <Link
        href={`/events/${event._id}`}
        className="flex flex-col gap-3 md:gap-4 p-5 min-h-[230px]"
      >
        {!hidePrice && (
          <div className="flex gap-2">
            <span className="p-semibold-14 w-min rounded-full bg-green-100 text-green-700 px-4 py-1">
              {event.isFree ? "FREE" : `$${event.price}`}{" "}
            </span>
            <p className="p-semibold-14 w-min rounded-full bg-gray-500/10 text-gray-500 px-4 py-1 line-clamp-1">
              {event.category.name}
            </p>
          </div>
        )}

        <p className="p-medium-16 p-medium-18 text-gray-500">
          {formatDateTime(event.startDateTime).dateTime}
        </p>

        <p className="p-medium-16 md:p-medium-20 flex-1 line-clamp-2 text-black">
          {event.title}
        </p>

        <div className="flex-between w-full ">
          <p className="p-medium-14 md:p-medium-16 text-gray-600">
            {event.organizer.firstName} {event.organizer.lastName}
          </p>

          {hasOrderLink && (
            <Link href={`/orders?eventId=${event._id}`} className="flex gap-2">
              <p className="text-primary-500">Order Details</p>
              <Image
                src="/assets/icons/arrow.svg"
                alt="arrow"
                width={10}
                height={10}
              />
            </Link>
          )}
        </div>
      </Link>
    </div>
  );
};

export default Card;

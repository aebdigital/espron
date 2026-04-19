import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import FaqAccordion from "@/components/site/FaqAccordion";
import FloatingQuoteButton from "@/components/site/FloatingQuoteButton";
import InsulationQuoteForm from "@/components/site/InsulationQuoteForm";
import ServiceRealizationGallery from "@/components/site/ServiceRealizationGallery";
import QuoteScrollButton from "@/components/site/QuoteScrollButton";
import ServiceIntroSection from "@/components/site/ServiceIntroSection";
import { getSitePageByPath } from "@/lib/espron-content";
import { ZATEPLENIE_FASADY_REALIZATIONS } from "@/lib/legacy-gallery-data";
import { CONTACT_INFO } from "@/lib/site-navigation";

export const metadata: Metadata = {
  title: "Zateplenie fasády | ESPRON",
  description:
    "Kompletné zateplenie rodinných domov kdekoľvek na Slovensku. Bez estetických chýb a skrytých poplatkov. Ceny od 94 €/m².",
};

export const revalidate = 0;

const PROBLEMS = [
  {
    label: "Tepelné mosty",
    desc: "Nesprávne detaily vedú k únikom tepla a vzniku chladných miest v interiéri.",
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    label: "Vlhnutie stien",
    desc: "Nekvalitné zateplenie bráni stenám 'dýchať', čo vedie k zrážaniu vlhkosti a plesniam.",
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5" />
      </svg>
    ),
  },
  {
    label: "Praskliny na fasáde",
    desc: "Nedodržanie technologických páuz spôsobuje napätie a vznik trhlín v omietke.",
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3" />
      </svg>
    ),
  },
  {
    label: "Zatekanie vody",
    desc: "Zle osadené parapety a lišty umožňujú vode prenikať pod izolant a ničiť konštrukciu.",
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    ),
  },
];

const INCLUDED = [
  {
    label: "Postavenie lešenia",
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 68 85" xmlns="http://www.w3.org/2000/svg">
        <g>
          <path d="M64.9,64.5h-8.1v-4.1h4.8c0.6,0,1-0.4,1-1s-0.4-1-1-1h-4.8v-14h4.8c0.6,0,1-0.4,1-1s-0.4-1-1-1h-4.8v-14h4.8   c0.6,0,1-0.4,1-1s-0.4-1-1-1h-4.8v-14h4.8c0.6,0,1-0.4,1-1s-0.4-1-1-1h-4.8V2.5c0-0.6-0.4-1-1-1c-0.6,0-1,0.4-1,1v7.8h-5.8V2.5   c0-0.6-0.4-1-1-1s-1,0.4-1,1v7.8H21.1V2.5c0-0.6-0.4-1-1-1s-1,0.4-1,1v7.8h-5.8V2.5c0-0.6-0.4-1-1-1s-1,0.4-1,1v7.8H6.4   c-0.6,0-1,0.4-1,1s0.4,1,1,1h4.8v14H6.4c-0.6,0-1,0.4-1,1s0.4,1,1,1h4.8v14H6.4c-0.6,0-1,0.4-1,1s0.4,1,1,1h4.8v14H6.4   c-0.6,0-1,0.4-1,1s0.4,1,1,1h4.8v4.1H3.1c-0.6,0-1,0.4-1,1s0.4,1,1,1h61.8c0.6,0,1-0.4,1-1S65.5,64.5,64.9,64.5z M19.1,64.5h-5.8   v-4.1h5.8V64.5z M19.1,58.4h-5.8v-2h5.8V58.4z M19.1,54.4h-5.8v-2h5.8V54.4z M19.1,50.4h-5.8v-2h5.8V50.4z M19.1,46.4h-5.8v-2h5.8   V46.4z M19.1,42.3h-5.8v-14h5.8V42.3z M19.1,26.3h-5.8v-2h5.8V26.3z M19.1,22.3h-5.8v-2h5.8V22.3z M19.1,18.3h-5.8v-2h5.8V18.3z    M19.1,14.3h-5.8v-2h5.8V14.3z M21.1,12.3h23.1L21.1,25.6V12.3z M21.1,29l23.1,13.3H21.1V29z M21.1,44.3h23.1L21.1,57.6V44.3z    M46.9,64.5H21.1v-4.1h25.9V64.5z M46.9,58.4H23.8l23.1-13.3V58.4z M46.9,41.6L23.8,28.3h23.1V41.6z M46.9,26.3H23.8L46.9,13V26.3z    M54.8,64.5h-5.8v-4.1h5.8V64.5z M54.8,58.4h-5.8v-14h5.8V58.4z M54.8,42.3h-5.8v-2h5.8V42.3z M54.8,38.3h-5.8v-2h5.8V38.3z    M54.8,34.3h-5.8v-2h5.8V34.3z M54.8,30.3h-5.8v-2h5.8V30.3z M54.8,26.3h-5.8v-14h5.8V26.3z" fill="currentColor" />
        </g>
      </svg>
    ),
  },
  {
    label: "Zakrytie okien a dlažby",
    icon: (
      <svg className="h-8 w-8" viewBox="26.514 26.542 146.972 146.916" xmlns="http://www.w3.org/2000/svg">
        <path fill="currentColor" d="M170.716 172.315a2.77 2.77 0 0 1-2.77-2.77V81.853L100 32.728 32.054 81.853v87.692a2.77 2.77 0 1 1-5.54 0V80.438c0-.889.427-1.724 1.147-2.244l70.716-51.127c.969-.7 2.277-.7 3.246 0l70.716 51.127a2.77 2.77 0 0 1 1.147 2.244v89.107a2.77 2.77 0 0 1-2.77 2.77"></path>
        <path fill="currentColor" d="M99.888 173.458c-.393 0-.786-.084-1.152-.251-1.585-.725-38.822-18.031-38.822-42.164 0-26.438 1.166-46.733 1.177-46.935a2.77 2.77 0 0 1 3.635-2.468l.591.195c10.43 3.446 21.945 3.52 32.424.208l1.313-.415a2.77 2.77 0 0 1 1.644-.008l1.833.561c10.537 3.223 22.076 3.033 32.491-.533a2.77 2.77 0 0 1 3.663 2.486c.012.242 1.176 24.468 1.176 46.908 0 24.134-37.236 41.439-38.822 42.164a2.8 2.8 0 0 1-1.152.251Zm-33.447-85.5c-.328 6.898-.988 23.246-.988 43.085 0 10.532 9.48 19.978 17.433 26.048 7.082 5.405 14.264 9.166 17 10.523 6.11-3.036 34.436-18.113 34.436-36.57 0-17.235-.691-35.537-1.011-43.078-10.557 2.87-21.927 2.717-32.4-.486l-1.01-.309-.491.155c-10.627 3.36-22.222 3.567-32.969.632"></path>
        <path fill="currentColor" d="M99.888 149.462c-13.613 0-24.689-11.075-24.689-24.689s11.075-24.688 24.689-24.688 24.689 11.075 24.689 24.688-11.075 24.689-24.688 24.689m0-43.838c-10.559 0-19.15 8.59-19.15 19.149s8.59 19.149 19.15 19.149 19.149-8.59 19.149-19.149-8.59-19.149-19.149-19.149"></path>
        <path fill="currentColor" d="M95.095 135.991c-.709 0-1.418-.27-1.959-.811l-6.946-6.946a2.77 2.77 0 0 1 3.917-3.917l4.987 4.987 14.286-14.286a2.77 2.77 0 0 1 3.917 3.917l-16.244 16.244a2.76 2.76 0 0 1-1.959.811Z"></path>
      </svg>
    ),
  },
  {
    label: "Penetrácia podkladu",
    icon: (
      <svg className="h-8 w-8" viewBox="55 43.5 89.999 112.998" xmlns="http://www.w3.org/2000/svg">
        <path d="M127.069 43.5H61.868C58.082 43.5 55 46.561 55 50.322v13.355c0 3.761 3.082 6.822 6.868 6.822h65.201c3.786 0 6.868-3.061 6.868-6.822V59.23h6.572v17.984l-46.503 9.711a2.232 2.232 0 0 0-1.783 2.182v15.46h-4.026c-2.029 0-3.681 1.639-3.681 3.655v2.666c0 .887.316 1.725.893 2.387.639.976 1.56 2.8 1.602 4.035l-2.662 28.318a10.067 10.067 0 0 0 2.665 7.632 10.213 10.213 0 0 0 7.454 3.238c2.821 0 5.539-1.181 7.454-3.238a10.068 10.068 0 0 0 2.662-7.665l-2.658-28.285c.042-1.237.965-3.062 1.602-4.035.577-.662.893-1.5.893-2.387v-2.666c0-2.015-1.652-3.655-3.681-3.655h-4.027V90.919l46.503-9.711a2.232 2.232 0 0 0 1.783-2.182V57a2.238 2.238 0 0 0-2.245-2.23h-8.818v-4.448c.001-3.761-3.081-6.822-6.867-6.822zm-29.624 74.106l2.668 28.388a5.54 5.54 0 0 1-1.488 4.24c-1.083 1.163-2.56 1.805-4.156 1.805s-3.073-.642-4.156-1.806a5.525 5.525 0 0 1-1.49-4.221l2.671-28.405c.007-.07.01-.138.01-.208 0-3.08-2.215-6.392-2.466-6.759l-.031-.042v-1.568h10.924v1.568a1.53 1.53 0 0 0-.031.042c-.251.367-2.466 3.68-2.466 6.759 0 .069.003.138.011.207zm32.001-53.929a2.371 2.371 0 0 1-2.377 2.361H61.868a2.371 2.371 0 0 1-2.377-2.361V50.322a2.37 2.37 0 0 1 2.377-2.361h65.201a2.371 2.371 0 0 1 2.377 2.361v13.355z" fill="currentColor" />
        <path d="M123.024 51.566h-57.11c-1.24 0-2.245.999-2.245 2.23a2.238 2.238 0 0 0 2.245 2.23h57.11c1.24 0 2.245-.999 2.245-2.23a2.238 2.238 0 0 0-2.245-2.23z" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Lepenie izolantu",
    icon: (
      <svg className="h-8 w-8" viewBox="26.001 30.498 147.999 139" xmlns="http://www.w3.org/2000/svg">
        <path fill="currentColor" d="M173.683 50.072c-.001-.045-.012-.087-.016-.132-.002-.02.005-.039.003-.059-.003-.024-.015-.043-.018-.067a2.198 2.198 0 0 0-.165-.602l-.002-.004a2.174 2.174 0 0 0-.341-.515c-.021-.024-.039-.048-.061-.071a2.2 2.2 0 0 0-.471-.376c-.029-.017-.059-.03-.089-.046a2.131 2.131 0 0 0-.562-.209c-.011-.002-.02-.009-.031-.012-1.994-.397-48.975-9.744-59.543-11.176-8.037-1.089-18.878-4.446-23.166-5.838a9.433 9.433 0 0 0-5.797-.021c-7.255 2.299-24.862 7.979-31.644 11.073-8.068 3.681-23.55 8.673-23.705 8.723-.022.007-.039.024-.061.031a2.18 2.18 0 0 0-.655.379 2.215 2.215 0 0 0-.381.393c-.022.031-.037.065-.058.097a2.133 2.133 0 0 0-.233.483c-.012.037-.028.071-.038.108a2.125 2.125 0 0 0-.084.507c-.051 1.549-1.251 38.059.011 50.298a2.177 2.177 0 0 0 1.669 1.896c.401.094 39.026 9.171 50.945 13.24-16.215 5.316-35.132 11.329-35.381 11.408-.009.003-.016.01-.025.013a2.152 2.152 0 0 0-.646.35 2.136 2.136 0 0 0-.42.424c-.016.021-.027.045-.042.066a2.171 2.171 0 0 0-.255.507c-.01.029-.023.055-.032.084a2.137 2.137 0 0 0-.092.484c-.007.108-.724 10.995-.002 24.908a2.179 2.179 0 0 0 1.574 1.98c.408.117 10.092 2.886 18.042 4.444 7.689 1.508 21.463 6.478 21.601 6.528.06.022.123.033.185.049.052.014.103.032.157.042.129.024.259.038.391.038l.008.001h.001l.091-.002c.153-.006.301-.029.444-.065h.003c.886-.226 21.837-5.592 32.751-10.895 10.606-5.154 51.749-19.761 52.164-19.908a2.176 2.176 0 0 0 1.438-1.83c1.273-12.466.052-24.41 0-24.912a2.107 2.107 0 0 0-.132-.528c-.015-.042-.034-.081-.052-.122a2.166 2.166 0 0 0-.299-.499l-.029-.037a2.197 2.197 0 0 0-.446-.387c-.036-.024-.07-.049-.108-.072a2.19 2.19 0 0 0-.567-.235c-.013-.003-.023-.012-.036-.015-.474-.111-4.825-1.132-10.477-2.445 6.56-2.461 13.022-5.279 13.379-5.435a2.176 2.176 0 0 0 1.302-1.883c.715-13.946.009-49.796.003-50.156z" />
        <path d="M53.589 45.979C60.338 42.9 79.14 36.87 84.741 35.095a5.1 5.1 0 0 1 3.134.011c4.399 1.43 15.539 4.876 23.927 6.013 8.015 1.086 38.403 7.014 52.286 9.748-3.864 1.574-8.753 3.478-12.688 4.729-7.435 2.364-34.183 13.65-38.522 15.486-3.496-.494-21.709-3.171-31.179-6.641-8.096-2.966-32.573-8.985-45.042-11.982 5.248-1.808 12.212-4.326 16.932-6.48z" fill="#F9F3D9" />
        <path d="M85.947 115.488c-.596-.178-1.332-.34-2.113-.511-.799-.175-1.705-.375-2.135-.533-9.744-3.57-43.224-11.563-50.927-13.385-.837-11.148-.179-37.135.065-45.512 9.204 2.188 40.355 9.682 49.362 12.982 9.146 3.351 25.326 5.886 30.821 6.686.066 5.071.238 19.576.213 31.961a1238.667 1238.667 0 0 1-18.378 6.453 951.607 951.607 0 0 1-6.345 2.13 2.188 2.188 0 0 0-.563-.271z" fill="#F9F3D9" />
        <path d="M46.569 154.634a242.07 242.07 0 0 1-.061-20.14l35.502 9.995a326.197 326.197 0 0 0-.048 19.721c-4.599-1.588-13.389-4.497-19.214-5.639-5.956-1.168-13.122-3.092-16.179-3.937z" fill="#F9F3D9" />
        <path d="M166.939 134.992c-7.267 2.59-41.439 14.836-51.303 19.631-8.305 4.036-23.28 8.272-29.305 9.899-.275-8.817-.075-16.7.037-19.966 5.2-1.376 21.847-5.951 31.174-10.484 9.028-4.388 40.167-15.619 49.493-18.956.271 4.004.609 11.805-.096 19.876z" fill="#F9F3D9" />
        <path d="M115.636 130.158c-9.55 4.641-27.917 9.546-31.359 10.446l-32.237-9.076c10.496-3.357 30.471-9.78 42.221-13.777 7.054-2.4 27.791-9.68 32.686-11.856 1.055-.468 2.156-.609 3.179-.41 4.428.864 21.337 4.778 31.164 7.067-12.349 4.446-37.436 13.612-45.654 17.606z" fill="#F9F3D9" />
        <path d="M169.391 98.659c-3.174 1.357-11.772 4.964-17.99 6.941-.101.032-.192.078-.285.123-8.368-1.93-17.082-3.911-20.157-4.511-1.913-.373-3.91-.129-5.783.705-1.584.704-5.202 2.076-9.583 3.679.009-12.394-.161-26.364-.221-30.84 6.02-2.541 30.547-12.848 37.349-15.01 5.541-1.762 12.687-4.681 16.663-6.355.149 8.794.499 33.322.007 45.268z" fill="#F9F3D9" />
        <path d="M56.025 89.032a2.182 2.182 0 0 0-3.055.397c-1.023 1.329-3.289 1.056-3.808.665a2.182 2.182 0 0 0-3.05.435 2.176 2.176 0 0 0 .435 3.048c.989.741 2.498 1.206 4.105 1.206 2.06 0 4.281-.766 5.77-2.7a2.173 2.173 0 0 0-.397-3.051z" fill="#F9F3D9" opacity=".3" />
        <path d="M75.082 77.647a2.177 2.177 0 0 0-.848 4.271c1.204.245 3.954 1.266 4.282 2.708a2.178 2.178 0 0 0 4.248-.967c-1.043-4.58-7.006-5.879-7.682-6.012z" fill="#F9F3D9" opacity=".3" />
        <path d="M90.249 128.348c-1.614.316-4.071.664-6.619.515a2.181 2.181 0 0 0-2.301 2.047 2.178 2.178 0 0 0 2.05 2.299c.5.029.995.042 1.483.042 2.439 0 4.676-.327 6.226-.631a2.177 2.177 0 1 0-.839-4.272z" fill="#F9F3D9" opacity=".3" />
        <path d="M161.245 70.599c-5.092-1.619-9.904 2.092-10.107 2.251a2.173 2.173 0 0 0-.37 3.046 2.174 2.174 0 0 0 1.721.839 2.18 2.18 0 0 0 1.333-.454c.032-.024 3.226-2.446 6.102-1.533a2.177 2.177 0 0 0 1.321-4.149z" fill="#F9F3D9" opacity=".3" />
        <path d="M132.808 78.978a2.179 2.179 0 0 0-3.08 0c-.546.546-2.507.867-3.946.804-1.142-.041-2.217.876-2.271 2.076a2.177 2.177 0 0 0 2.077 2.273c.119.005.31.012.554.012 1.445 0 4.795-.216 6.666-2.086a2.176 2.176 0 0 0 0-3.079z" fill="#F9F3D9" opacity=".3" />
        <path d="M94.132 108.466a2.176 2.176 0 0 0 .667-3.337 5.721 5.721 0 0 1-.041-.284 2.176 2.176 0 0 0-2.403-1.923 2.176 2.176 0 0 0-1.927 2.401c.188 1.704.655 2.639 1.564 3.126.321.172.704.258 1.087.258.369.001.74-.08 1.053-.241z" fill="#F9F3D9" opacity=".3" />
        <path d="M103.769 61.31c.67.178 1.24.268 1.732.268.725 0 1.284-.196 1.75-.594.545-.466.866-1.274.79-1.986a2.171 2.171 0 0 0-2.395-1.936 2.207 2.207 0 0 0-.479.105 5.089 5.089 0 0 1-.28-.065 2.175 2.175 0 0 0-2.662 1.545 2.176 2.176 0 0 0 1.544 2.663z" fill="#F9F3D9" opacity=".3" />
        <path d="M155.337 127.649a2.145 2.145 0 0 0-.472.105 6.206 6.206 0 0 1-.28-.065 2.178 2.178 0 0 0-1.118 4.208c.67.178 1.239.269 1.732.269.727 0 1.284-.197 1.751-.596.545-.467.865-1.277.787-1.991a2.18 2.18 0 0 0-2.4-1.93z" fill="#F9F3D9" opacity=".3" />
        <path d="M63.328 148.37a6.143 6.143 0 0 1-.143-.247 2.177 2.177 0 0 0-3.842 2.053c.808 1.511 1.589 2.205 2.613 2.32.073.008.148.012.223.012.653 0 1.35-.306 1.771-.792a2.176 2.176 0 0 0-.622-3.346z" fill="#F9F3D9" opacity=".3" />
        <path d="M120.48 142.162a2.18 2.18 0 0 0-3.076 1.463 4.807 4.807 0 0 1-.202.202 2.176 2.176 0 0 0 1.488 3.766c.533 0 1.067-.194 1.486-.585 1.254-1.17 1.724-2.103 1.572-3.122-.107-.709-.624-1.41-1.268-1.724z" fill="#F9F3D9" opacity=".3" />
        <path d="M126.752 112.903c-.412.044-.784.2-1.09.435-.621.187-2.144.508-3.557.742a2.177 2.177 0 1 0 .713 4.295c3.974-.659 6.598-1.095 6.333-3.542a2.175 2.175 0 0 0-2.399-1.93z" fill="#F9F3D9" opacity=".3" />
        <path d="M43.913 65.682a2.159 2.159 0 0 0-.479-.079 4.783 4.783 0 0 1-.235-.163 2.178 2.178 0 0 0-2.603 3.49c1.019.76 1.834 1.12 2.585 1.12.262 0 .516-.044.769-.13.679-.231 1.277-.864 1.472-1.554a2.177 2.177 0 0 0-1.509-2.684z" fill="#F9F3D9" opacity=".3" />
        <path d="M136.672 93.184a2.159 2.159 0 0 0-.479-.079 5.588 5.588 0 0 1-.235-.163 2.178 2.178 0 0 0-2.603 3.49c1.019.76 1.834 1.12 2.585 1.12.262 0 .516-.044.769-.13.679-.231 1.278-.864 1.472-1.554a2.177 2.177 0 0 0-1.509-2.684z" fill="#F9F3D9" opacity=".3" />
        <path d="M153.758 90.35c-.165.021-.324.06-.475.114a5.242 5.242 0 0 1-.28-.059 2.176 2.176 0 1 0-1.042 4.227c.639.158 1.186.238 1.661.238.762 0 1.338-.206 1.811-.626.537-.476.843-1.29.754-2.001a2.184 2.184 0 0 0-2.429-1.893z" fill="#F9F3D9" opacity=".3" />
        <path d="M87.536 47.425c.428.097 1.089.279 1.677.467a2.178 2.178 0 0 0 1.325-4.147c-2.473-.79-4.054-1.18-5.134.038-.572.644-.715 1.645-.356 2.429a2.18 2.18 0 0 0 2.488 1.213z" fill="#F9F3D9" opacity=".3" />
      </svg>
    ),
  },
  {
    label: "Zápustné kotvenie",
    icon: (
      <svg className="h-8 w-8" viewBox="40.001 40 120.002 120" xmlns="http://www.w3.org/2000/svg">
        <path d="M42.844 159.913a76.035 76.035 0 0 0 32.619-19.245l59.751-59.753 22.506.534h.052a2.225 2.225 0 0 0 1.575-3.802l-36.993-36.995a2.234 2.234 0 0 0-2.452-.473 2.23 2.23 0 0 0-1.35 2.1l.533 22.506-59.751 59.752a76.019 76.019 0 0 0-19.246 32.62 2.226 2.226 0 0 0 2.756 2.756zm29.469-22.395c-.203.203-.413.4-.618.601l-6.894-12.75 5.44-5.44 6.823 12.619c.026.047.057.089.085.134l-4.836 4.836zm6.656-26.317l6.823 12.619c.026.047.056.089.085.134l-5.448 5.448-6.9-12.761 5.44-5.44zm8.728-8.728l6.823 12.619c.026.047.056.089.085.134l-5.448 5.448-6.9-12.761 5.44-5.44zm8.727-8.728l6.824 12.619c.025.047.056.088.084.133l-5.449 5.449-6.9-12.761 5.441-5.44zm8.728-8.728l6.824 12.618c.025.047.056.089.085.133l-5.449 5.449-6.9-12.76 5.44-5.44zm8.728-8.728l6.824 12.619c.025.047.056.089.084.133l-5.448 5.448-6.901-12.759 5.441-5.441zm10.188 9.472l-6.9-12.76 4.167-4.167 3.539 3.539 3.331 3.331 2.96 2.96-7.097 7.097zm12.058-25.037l-2.036 2.035a2.227 2.227 0 1 0 3.15 3.15l2.036-2.035 12.987 12.987-17.004-.403-7.235-7.235-4.483-4.483-.403-17.004 12.988 12.988zm-74.603 67.95l6.783 12.546a71.377 71.377 0 0 1-6.557 4.995l-5.666-11.179a71.22 71.22 0 0 1 5.44-6.362zm-8.34 10.493l4.78 9.431a71.56 71.56 0 0 1-12.289 5.729 71.576 71.576 0 0 1 7.509-15.16z" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "APU lišty a profily",
    icon: (
      <svg className="h-8 w-8" viewBox="20 22.128 160 155.744" xmlns="http://www.w3.org/2000/svg">
        <path d="M164.166 165.336h-57.119a2.739 2.739 0 0 1-2.741-2.743l.018-29.304c0-.751.31-1.469.853-1.986.546-.516 1.288-.76 2.027-.75 34.593 1.779 59.703 15.255 59.703 32.041a2.74 2.74 0 0 1-2.741 2.742zm-54.377-5.482h51.297c-2.905-11.739-24.192-21.665-51.28-23.646l-.017 23.646z" fill="currentColor" />
        <path d="M92.952 165.336H35.833a2.742 2.742 0 0 1-2.741-2.741c0-16.786 25.11-30.262 59.703-32.041.753-.016 1.485.232 2.027.75a2.75 2.75 0 0 1 .853 1.986l.018 29.304a2.744 2.744 0 0 1-2.741 2.742zm-54.038-5.482h51.297l-.018-23.646c-27.087 1.981-48.374 11.907-51.279 23.646z" fill="currentColor" />
        <path d="M177.259 177.872H22.741A2.741 2.741 0 0 1 20 175.131V24.869a2.741 2.741 0 0 1 2.741-2.741h154.518A2.742 2.742 0 0 1 180 24.869V175.13a2.742 2.742 0 0 1-2.741 2.742zm-151.777-5.483h149.035V27.611H25.482v144.778zm138.888-7.053h-57.323a2.741 2.741 0 0 1-2.741-2.741V37.407a2.741 2.741 0 0 1 2.741-2.741h57.323a2.742 2.742 0 0 1 2.741 2.741v125.189a2.741 2.741 0 0 1-2.741 2.74zm-54.581-5.482h51.84V40.148h-51.84v119.706zm-16.837 5.482H35.633a2.742 2.742 0 0 1-2.741-2.741V37.407a2.741 2.741 0 0 1 2.741-2.741h57.319a2.741 2.741 0 0 1 2.741 2.741v125.189a2.74 2.74 0 0 1-2.741 2.74zm-54.578-5.482h51.837V40.148H38.374v119.706z" fill="currentColor" />
        <path d="M100.002 102.742H79.243a2.741 2.741 0 0 1 0-5.482h20.759a2.742 2.742 0 0 1 0 5.482z" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Sieťka a lepidlo (1.v.)",
    icon: (
      <svg className="h-8 w-8" viewBox="31.498 30 137.001 140" xmlns="http://www.w3.org/2000/svg">
        <path d="M152.209 80.6c.001-10.367.042-20.743.392-31.084 5.3.013 10.6.047 15.898.097-.011-.919-.022-1.839-.037-2.758a2237.01 2237.01 0 0 0-15.76-.1c.059-1.483.122-2.966.195-4.447.202-4.095.485-8.199.756-12.308l-2.762.019c-.192 2.826-.387 5.643-.551 8.446a438.495 438.495 0 0 0-.402 8.283c-10.212-.016-20.428.039-30.643.163.026-.824.047-1.649.074-2.473.153-4.741.327-9.479.512-14.216l-1.262.009-1.492.013c-.215 5.564-.415 11.129-.588 16.698-8.467.114-16.933.281-25.398.491l.043-1.18c.199-5.237.415-10.471.638-15.704-.923.015-1.847.032-2.77.049-.152 3.572-.299 7.145-.441 10.719-.081 2.062-.157 4.124-.234 6.186-4.294.112-8.587.232-12.88.369-6.108.195-12.213.421-18.316.666.415-5.704.813-11.413 1.077-17.13-.912.033-1.825.065-2.737.1-.277 5.597-.684 11.177-1.09 16.713l-.03.427c-7.577.314-15.151.665-22.72 1.054-.064.534-.126 1.069-.183 1.603.118.386.224.773.323 1.161 7.457-.383 14.918-.726 22.383-1.035a740.986 740.986 0 0 0-1.506 30.058l-20.118.179c.138.917.235 1.838.293 2.762l19.747-.176a647.49 647.49 0 0 0-.115 5.591c-.145 9.178-.212 18.366-.236 27.557l-19.547.173c-.036.921-.1 1.843-.187 2.766l19.729-.175c-.017 10.297.014 20.598.048 30.896-4.89.076-9.781.158-14.671.253-.137.926-.289 1.851-.452 2.773 5.044-.099 10.088-.183 15.132-.261.016 4.907.029 9.812.039 14.716l2.774.016-.005-14.775c10.303-.149 20.607-.252 30.91-.309-.033 5.017-.058 10.035-.068 15.052v.36c.924.013 1.848.029 2.772.043.01-5.158.032-10.315.065-15.472 8.984-.042 17.966-.047 26.947-.019.084 5.07.179 10.14.297 15.209l.019.74 2.782.05c-.126-5.329-.235-10.659-.324-15.99 10.316.041 20.629.128 30.938.262l.008 15.962v.286l2.765.042-.007-16.255c5.178.072 10.354.156 15.53.252l.036-1.587.024-1.178c-5.196-.096-10.393-.176-15.591-.248l-.009-21.147-.004-10.454c5.281.011 10.558.055 15.832.144v-2.838a613.119 613.119 0 0 0-6.791-.09c-3.013-.022-6.027-.034-9.041-.04l-.013-31.512-.001-1.682 7.222-.064c2.964-.026 5.929-.05 8.894-.07l.04-2.766c-1.697.011-3.394.024-5.09.038-3.683.031-7.373.065-11.062.097zM86.06 150.705c-1.073.006-2.146.009-3.219.016-9.237.06-18.474.163-27.71.298l-.005-13.742c-.002-5.716-.011-11.428-.009-17.138l31.308-.277c-.168 10.278-.29 20.559-.365 30.843zm.41-33.621c-3.878.043-7.755.083-11.63.117l-19.72.175c.012-11.064.081-22.115.346-33.148l31.733-.283c-.298 11.041-.54 22.088-.729 33.139zm.806-35.906-12.519.113-19.22.171c.272-10.064.716-20.113 1.443-30.143a2249.61 2249.61 0 0 1 31.292-1.039 3379.12 3379.12 0 0 0-.996 30.898zm2.691 2.742 24.661-.22 1.068-.01a2234.87 2234.87 0 0 0-.247 33.062c-8.738.092-17.476.201-26.21.3.189-11.048.432-22.093.728-33.132zm-1.14 66.771c.075-10.287.195-20.572.362-30.854l24.649-.218 1.616-.015c.014 10.354.1 20.71.258 31.064-8.96-.028-17.922-.019-26.885.023zm26.913-69.769-25.698.232c.285-10.32.618-20.635.998-30.943 8.471-.212 16.944-.38 25.417-.496-.311 10.395-.55 20.798-.717 31.207zm2.717 2.744 30.988-.276c0 11.055.004 22.11.01 33.164-10.406-.007-20.82.065-31.235.17-.004-11.022.077-22.043.237-33.058zm.028 67.015c-.16-10.366-.247-20.734-.263-31.102 10.422-.097 20.834-.201 31.233-.199l.015 31.565a3403.042 3403.042 0 0 0-30.985-.264zm30.959-70.057c-10.315.09-20.629.179-30.944.272.164-10.411.402-20.816.713-31.214 10.209-.127 20.418-.185 30.625-.173-.35 10.351-.392 20.74-.394 31.115z" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Druhá vrstva lepidla",
    icon: (
      <svg className="h-8 w-8" viewBox="27.499 47 145.001 106.002" xmlns="http://www.w3.org/2000/svg">
        <path fill="currentColor" d="M80.764 108.793a2.93 2.93 0 0 0 2.469-1.343 2.934 2.934 0 0 0 .216-2.802L58.418 48.74a2.908 2.908 0 0 0-2.68-1.74h-.006a2.908 2.908 0 0 0-2.68 1.73l-25.29 55.908a2.931 2.931 0 0 0 .208 2.808 2.93 2.93 0 0 0 2.472 1.348h17.599l-1.649 33.632c-.124 2.929.916 5.77 2.855 7.792 1.72 1.795 3.977 2.784 6.355 2.784s4.636-.988 6.355-2.784c1.938-2.022 2.979-4.862 2.854-7.798l-1.648-33.626h17.601zm-50.32-1.764c-.408 0-.769-.197-.99-.54a1.159 1.159 0 0 1-.083-1.124l25.29-55.908a1.15 1.15 0 0 1 1.073-.693h.002a1.15 1.15 0 0 1 1.073.697l25.03 55.908c.167.372.135.78-.086 1.122a1.16 1.16 0 0 1-.989.538H63.079l-.536-10.938H48.665l-.536 10.938H30.444zm30.242 41.967c-1.384 1.444-3.189 2.24-5.083 2.24s-3.698-.795-5.083-2.24c-1.607-1.677-2.469-4.045-2.366-6.491l2.189-44.65h10.518l2.189 44.644c.105 2.452-.757 4.82-2.364 6.497zm91.686-10.157c-7.257-1.459-12.189-1.547-16.152-1.618-6.462-.117-9.706-.175-15.571-6.523-2.068-2.238-5.919-4.072-10.302-4.905-4.867-.926-9.959-.58-14.339.973-6.819 2.418-15.172 8.75-16.238 25.193l-.061.939H172.5v-.882c0-.373-.229-9.177-20.128-13.177zM81.6 151.134c1.25-14.786 8.807-20.51 14.997-22.705 8.68-3.079 18.96-.644 22.757 3.465 6.377 6.902 10.091 6.969 16.835 7.09 3.892.07 8.735.157 15.836 1.584 14.603 2.935 17.814 8.428 18.516 10.565H81.6z" />
      </svg>
    ),
  },
  {
    label: "Penetrácia pod omietku",
    icon: (
      <svg className="h-8 w-8" viewBox="55 43.5 89.999 112.998" xmlns="http://www.w3.org/2000/svg">
        <path d="M127.069 43.5H61.868C58.082 43.5 55 46.561 55 50.322v13.355c0 3.761 3.082 6.822 6.868 6.822h65.201c3.786 0 6.868-3.061 6.868-6.822V59.23h6.572v17.984l-46.503 9.711a2.232 2.232 0 0 0-1.783 2.182v15.46h-4.026c-2.029 0-3.681 1.639-3.681 3.655v2.666c0 .887.316 1.725.893 2.387.639.976 1.56 2.8 1.602 4.035l-2.662 28.318a10.067 10.067 0 0 0 2.665 7.632 10.213 10.213 0 0 0 7.454 3.238c2.821 0 5.539-1.181 7.454-3.238a10.068 10.068 0 0 0 2.662-7.665l-2.658-28.285c.042-1.237.965-3.062 1.602-4.035.577-.662.893-1.5.893-2.387v-2.666c0-2.015-1.652-3.655-3.681-3.655h-4.027V90.919l46.503-9.711a2.232 2.232 0 0 0 1.783-2.182V57a2.238 2.238 0 0 0-2.245-2.23h-8.818v-4.448c.001-3.761-3.081-6.822-6.867-6.822zm-29.624 74.106l2.668 28.388a5.54 5.54 0 0 1-1.488 4.24c-1.083 1.163-2.56 1.805-4.156 1.805s-3.073-.642-4.156-1.806a5.525 5.525 0 0 1-1.49-4.221l2.671-28.405c.007-.07.01-.138.01-.208 0-3.08-2.215-6.392-2.466-6.759l-.031-.042v-1.568h10.924v1.568a1.53 1.53 0 0 0-.031.042c-.251.367-2.466 3.68-2.466 6.759 0 .069.003.138.011.207zm32.001-53.929a2.371 2.371 0 0 1-2.377 2.361H61.868a2.371 2.371 0 0 1-2.377-2.361V50.322a2.37 2.37 0 0 1 2.377-2.361h65.201a2.371 2.371 0 0 1 2.377 2.361v13.355z" fill="currentColor" />
        <path d="M123.024 51.566h-57.11c-1.24 0-2.245.999-2.245 2.23a2.238 2.238 0 0 0 2.245 2.23h57.11c1.24 0 2.245-.999 2.245-2.23a2.238 2.238 0 0 0-2.245-2.23z" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Finálna fasádna omietka",
    icon: (
      <svg className="h-8 w-8" viewBox="29.5 20.181 141 159.638" xmlns="http://www.w3.org/2000/svg">
        <path d="M144.201 66.196H55.799L29.5 103.369l70.5 76.45 70.5-76.452-26.299-37.171zm-5.311 10.252l15.119 21.369h-21.833l-7.442-21.369h14.156zm-52.762 0h27.743l7.443 21.369H78.685l7.443-21.369zm-25.02 0h14.159l-7.443 21.369H45.991l15.117-21.369zm-13.324 31.621h20.25l16.325 39.661-36.575-39.661zm31.341 0h41.748L100 158.78l-20.875-50.711zm36.516 39.66l16.325-39.661h20.249l-36.574 39.661z" fill="currentColor" />
        <path fill="currentColor" d="M101.057 20.181v29.492h-1.95V20.181h1.95z" />
        <path fill="currentColor" d="M147.814 28.123l1.378 1.378-20.853 20.866-1.379-1.378 20.854-20.866z" />
        <path fill="currentColor" d="M52.174 28.129l20.867 20.854-1.378 1.379-20.867-20.855 1.378-1.378z" />
      </svg>
    ),
  },
];

const BONUSES = [
  {
    num: "Bonus #1",
    title: "Extra záruka +365 dní v základe",
    desc: "V tomto balíku automaticky predlžujeme zákonnú záruku. Sme si istí kvalitou našej práce, preto za vašu fasádu ručíme dlhšie, než vyžaduje zákon.",
  },
  {
    num: "Bonus #2",
    title: "Dokumentácia pre Obnov dom (Mini)",
    desc: "Pripravíme za vás technickú dokumentáciu pre SAŽP: Zmluvu o dielo, podrobný súpis prác a potvrdenie o ekologickej likvidácii odpadu. Vy len podáte žiadosť, o zvyšok sa postaráme my.",
  },
  {
    num: "Bonus #3",
    title: "Fixná cena lešenia (Žiadne doplatky)",
    desc: "Na rozdiel od základného balíka, tu máte nájom lešenia už v cene diela. Neriskujete doplatky za prenájom lešenia pri nepriazni počasia. Máte istotu, že dohodnutá suma sa v priebehu prác nenavýši.",
  },
];

const PACKAGES = [
  {
    name: "Balík ISTOTA",
    sub: "Základ poctivej fasády",
    highlight: false,
    items: [
      "Kompletný 10-krokový technologický postup ESPRON",
      "Montáž / demontáž a dovoz lešenia",
      "Ekologický odvoz a likvidácia odpadu",
      "Zákonná záruka 2 roky",
    ],
    price: "94 €/m² (EPS) | 104 €/m² (Vata)",
  },
  {
    name: "Balík BEZSTAROSTNOSŤ",
    sub: "- Najobľúbenejší -",
    highlight: true,
    items: [
      "Všetko z balíka ISTOTA",
      "+ Extra záruka +365 dní navyše (spolu 3 roky)",
      "+ Nájom lešenia v cene (Neriskujete doplatky za lešenie. Máte fixnú cenu počas celej realizácie)",
      "+ Set ochrannej impregnácie (Ochráni fasádu pred vznikom plesní a machov)",
      "+ Prioritný termín realizácie (Garancia nástupu v dohodnutom kalendárnom okne)",
      "+ Dokumentácia Obnov dom (Mini) (Pripravíme za vás všetky technické podklady zo strany zhotoviteľa)",
      "+ Denný foto-report (Každý večer dostanete na WhatsApp fotky z postupu prác pre vašu 100% kontrolu)",
    ],
    price: "99 €/m² (EPS) | 109 €/m² (Vata)",
  },
  {
    name: "Balík REŠTART",
    sub: "Pre najnáročnejších",
    highlight: false,
    items: [
      "Všetko z balíka BEZSTAROSTNOSŤ",
      "+ Záruka 5 rokov na celistvosť a funkčnosť fasády",
      "+ Odborná aplikácia impregnácie: Kompletné ošetrenie fasády naším tímom",
      "+ Hĺbkové čistenie okolia: Profesionálne vyčistenie zámkovej dlažby a chodníkov priemyselnou vapkou",
      "+ Čistenie strechy: Hĺbkové čistenie krytiny od machov a lišajníkov pre dokonalý vizuálny súlad s novou fasádou",
      "+ Interiérový bonus: Profesionálne tepovanie gauča a kobercov, aby bol váš domov po rekonštrukcii ako nový aj vo vnútri",
    ],
    price: "144 €/m² (EPS) | 149 €/m² (Vata)",
  },
];

const FAQ = [
  {
    question: "Pracujete po celom Slovensku?",
    answer: "Áno, realizujeme zateplenia po celom Slovensku. Dochádzame bez príplatkov do všetkých lokalít.",
  },
  {
    question: "Čo ak sa realizácia kvôli počasiu natiahne? Budem doplácať za lešenie?",
    answer: "V balíku BEZSTAROSTNOSŤ a REŠTART máte nájom lešenia zahrnutý v cene. Neriskujete žiadne doplatky, nech trvá realizácia akokoľvek dlho.",
  },
  {
    question: "Budem mať kontrolu nad prácou, aj keď nie som doma?",
    answer: "Áno. V balíku BEZSTAROSTNOSŤ a REŠTART dostávate každý večer denný foto-report na WhatsApp s fotkami z postupu prác.",
  },
  {
    question: "Ako je to s platbou?",
    answer: "Po akceptovaní cenovej ponuky sa zaplatí záloha za materiál. Zvyšok sa doplatí po dokončení prác.",
  },
  {
    question: "V akom stave zostane môj pozemok po vašom odchode?",
    answer: "Ekologický odvoz a likvidácia odpadu je súčasťou každého balíka. Pozemok odovzdávame v poriadku.",
  },
  {
    question: "Môžem si dom zatepliť svojpomocne?",
    answer: "Svojpomoc je možná, no odporúčame profesionálnu realizáciu – garantuje správny technologický postup, záruku a eliminuje riziko tepelných mostov či prasklín.",
  },
];

export default async function ZateplenieFasadyPage() {
  const page = await getSitePageByPath("/zateplenie-fasady");
  const hiddenHeroHighlights = new Set([
    "Postavenie lešenia",
    "Zakrytie okien a dlažby",
    "Penetrácia podkladu",
    "Lepenie izolantu",
  ]);
  const heroHighlights =
    page?.highlights.filter((highlight) => !hiddenHeroHighlights.has(highlight)) ?? [];

  return (
    <>
      {/* ── HERO (original PageTemplate style) ───────────────────────── */}
      <section className="relative overflow-hidden bg-primary-dark pb-18 pt-28 text-white md:pb-24 md:pt-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.14),transparent_34%),linear-gradient(120deg,rgba(255,255,255,0.06),transparent_26%)]" />
        {page?.heroImage ? (
          <div className="absolute inset-y-0 right-0 hidden w-[44vw] opacity-30 lg:block">
            <Image src={page.heroImage} alt={page.label} fill sizes="44vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-l from-primary-dark/20 via-primary-dark/40 to-primary-dark" />
          </div>
        ) : null}

 <div className="relative mx-auto grid w-[92%] gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
          <div className="max-w-4xl">
            <p className="animate-fade-up text-[11px] font-semibold uppercase tracking-[0.3em] text-white/55">
              {page?.eyebrow ?? "Zateplenie fasády"}
            </p>
            <h1 className="animate-fade-up-delay-1 mt-5 text-4xl font-extrabold tracking-tight text-white md:text-6xl lg:text-7xl">
              {page?.label ?? "Zateplenie fasády"}
            </h1>
            <p className="animate-fade-up-delay-2 mt-6 max-w-2xl text-base leading-8 text-white/72 md:text-lg">
              {page?.description}
            </p>
            <div className="animate-fade-up-delay-3 mt-8 flex flex-wrap gap-3">
              <QuoteScrollButton className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary transition-colors hover:bg-white/90">
                Kontaktovať nás
              </QuoteScrollButton>
              <Link href={`mailto:${CONTACT_INFO.email}`} className="rounded-full border border-white/20 px-6 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-white transition-colors hover:bg-white/10">
                Napísať e-mail
              </Link>
            </div>
          </div>

          {heroHighlights.length > 0 ? (
            <div className="animate-fade-up-delay-4 grid gap-3">
              {heroHighlights.map((highlight) => (
                <div key={highlight} className="rounded-[1.4rem] border border-white/12 bg-white/8 px-5 py-4 backdrop-blur-sm">
                  <p className="text-sm leading-6 text-white/82">{highlight}</p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <ServiceIntroSection
        titleSize="compact"
        title={
          <>
            Kompletné zateplenie rodinných domov{" "}
            <span className="underline underline-offset-4">kdekoľvek na Slovensku.</span>
            <br />
            <span className="font-light text-foreground/70">
              Bez estetických chýb a skrytých poplatkov.
            </span>
          </>
        }
        description="Vďaka práci zohraných 4-členných tímov a prísnym technologickým postupom eliminujeme bežné chyby, ako sú trhliny alebo viditeľné spoje na omietke."
        secondaryDescription="Kým iní si tieto veci účtujú ako príplatky, my ich považujeme za základ slušne odvedenej práce:"
        bullets={[
          "Postavenie a doprava lešenia",
          "Kompletné zakrytie okien a dlažby",
          "Odvoz a likvidácia odpadu",
        ]}
        note={{
          label: "Posledná šanca: Zateplenie za staré ceny",
          body: (
            <>
              + Bonus <em>„Čistý domov“</em> (Tepovanie a strojové čistenie okolia domu)
            </>
          ),
          footer: "Posledné 2 voľné termíny",
        }}
        imageSrc="/images/realizacie/b0408c_2883303b07a4489798740af9878cc2db~mv2.avif"
        imageAlt="Zateplenie fasády"
      />

      {/* ── PROBLEMS ─────────────────────────────────────────────────── */}
      <section className="bg-light py-20 md:py-28">
        <div className="mx-auto w-[92%]">
          <AnimateOnScroll className="mb-14 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Problémy spôsobené nekvalitným zateplením
            </h2>
            <p className="mt-3 text-sm text-foreground/55">Prečo si vybrať odbornú realizáciu?</p>
          </AnimateOnScroll>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {PROBLEMS.map((p, index) => (
              <AnimateOnScroll key={p.label} delay={index * 100}>
                <div className="group rounded-[2rem] border border-border bg-white p-8 transition-all hover:-translate-y-1 hover:border-primary/20 hover:shadow-[0_20px_50px_rgba(15,29,74,0.06)]">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    {p.icon}
                  </div>
                  <h3 className="mb-3 text-lg font-bold text-foreground">{p.label}</h3>
                  <p className="text-sm leading-7 text-foreground/60">{p.desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── INCLUDED ─────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="mx-auto w-[92%]">
          <AnimateOnScroll className="mb-14 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Všetky potrebné úkony v cene
            </h2>
            <p className="mt-3 text-sm text-foreground/55">S nami máte garanciu kvality</p>
          </AnimateOnScroll>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-5">
            {INCLUDED.map((item, index) => (
              <AnimateOnScroll key={item.label} delay={index * 50}>
                <div className="flex flex-col items-center gap-5 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-border bg-white text-primary shadow-sm transition-transform hover:scale-110">
                    {item.icon}
                  </div>
                  <p className="text-sm font-bold text-foreground/80 leading-tight">{item.label}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── BONUSES ──────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="mx-auto w-[92%]">
          <AnimateOnScroll className="mb-14 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Prečo naši klienti milujú balík <span className="uppercase">BEZSTAROSTNOSŤ</span>
            </h2>
            <p className="mt-3 text-sm text-foreground/55">
              Tieto výhody nájdete v našom najobľúbenejšom balíku, ktorý volí až{" "}
              <strong>85 % majiteľov domov.</strong>
            </p>
          </AnimateOnScroll>
          <div className="grid gap-8 md:grid-cols-3">
            {BONUSES.map((bonus, index) => (
              <AnimateOnScroll key={bonus.num} delay={index * 80}>
                <div className="rounded-[1.5rem] border border-border bg-white p-8 shadow-[0_12px_40px_rgba(15,29,74,0.05)]">
                  <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.22em] text-primary/55">{bonus.num}</p>
                  <h3 className="mb-4 text-base font-bold text-foreground">{bonus.title}</h3>
                  <p className="text-sm leading-7 text-foreground/70">{bonus.desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────────────────── */}
      <section className="bg-light py-20 md:py-28">
        <div className="mx-auto w-[92%]">
          <AnimateOnScroll className="mb-14 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Jasné ceny bez skrytých poplatkov
            </h2>
            <p className="mt-3 text-sm text-foreground/55">
              Vyberte si úroveň starostlivosti, ktorá najviac vyhovuje vašim plánom
            </p>
          </AnimateOnScroll>
          <div className="grid gap-6 md:grid-cols-3">
            {PACKAGES.map((pkg, index) => (
              <AnimateOnScroll key={pkg.name} delay={index * 80}>
                <div
                  className={`rounded-[1.5rem] border p-8 ${
                    pkg.highlight
                      ? "border-primary bg-primary text-white shadow-xl"
                      : "border-border bg-white shadow-[0_12px_40px_rgba(15,29,74,0.05)]"
                  }`}
                >
                  <h3 className={`mb-1 text-base font-extrabold uppercase tracking-tight ${pkg.highlight ? "text-white" : "text-foreground"}`}>
                    {pkg.name}
                  </h3>
                  <p className={`mb-6 text-[11px] font-semibold uppercase tracking-[0.2em] ${pkg.highlight ? "text-white/60" : "text-primary/55"}`}>
                    {pkg.sub}
                  </p>
                  <ul className="mb-8 space-y-3">
                    {pkg.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm">
                        <svg className={`mt-0.5 h-4 w-4 shrink-0 ${pkg.highlight ? "text-white/70" : "text-primary"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className={pkg.highlight ? "text-white/90" : "text-foreground/75"}>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className={`text-sm font-bold ${pkg.highlight ? "text-white" : "text-foreground"}`}>
                    Cena: {pkg.price}
                  </p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── URGENCY ──────────────────────────────────────────────────── */}
      <section className="bg-primary py-20 text-center md:py-28">
        <AnimateOnScroll className="mx-auto w-[92%] max-w-3xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.24em] text-amber-400">
            Posledné 2 voľné termíny
          </p>
          <h2 className="text-2xl font-extrabold uppercase tracking-tight text-white md:text-3xl lg:text-4xl">
            (3 z 5 sú už obsadené)
          </h2>
          <p className="mt-6 text-base leading-8 text-white/70">
            Zabezpečte si miesto v kalendári za aktuálne ceny, kým nezačne hlavná sezóna.
          </p>
          <p className="mt-6 text-sm leading-8 text-white/70">
            Rezervujte si zateplenie teraz a získajte Bonus „KOMPLETNÝ REŠTART&quot; v hodnote{" "}
            <strong className="text-amber-400">750 €</strong> úplne zadarmo:
          </p>
          <ul className="mt-4 space-y-2 text-sm font-semibold text-white/90">
            <li>+ Hĺbkové tepovanie sedačky a kobercov</li>
            <li>+ Strojové čistenie okolia domu profi technikou</li>
          </ul>
          <QuoteScrollButton
            label="Chcem si zabezpečiť termín"
            className="mt-10 inline-flex items-center justify-center rounded-full bg-white px-10 py-4 text-sm font-bold text-primary transition-colors hover:bg-white/90"
          />
        </AnimateOnScroll>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="mx-auto w-[92%] max-w-3xl">
          <AnimateOnScroll>
            <h2 className="mb-10 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Často sa nás pýtate (FAQ)
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll delay={80}>
            <FaqAccordion items={FAQ} />
          </AnimateOnScroll>
          <AnimateOnScroll delay={120}>
            <p className="mt-10 text-sm text-foreground/55">
              Ďalšie najčastejšie otázky a odpovede nájdete na{" "}
              <Link href="/zateplenie-fasady/faq" className="text-primary underline underline-offset-2 hover:opacity-70">
                /zateplenie-fasady/faq
              </Link>
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── CONTACT FORM ─────────────────────────────────────────────── */}
      <section
        id="cenova-ponuka"
        className="scroll-mt-32 bg-light py-20 md:scroll-mt-40 md:py-28"
      >
        <AnimateOnScroll className="mx-auto w-[92%] max-w-3xl">
          <h2 className="mb-3 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Máte záujem o cenovú ponuku na zateplenie fasády?
          </h2>
          <p className="mb-10 text-sm text-foreground/55">
            Po obdržaní informácií vám pošleme cenovú ponuku do 1–2 pracovných dní.
          </p>
          <InsulationQuoteForm />
        </AnimateOnScroll>
      </section>
      <ServiceRealizationGallery
        serviceSlug="zateplenie-fasady"
        title="Ukážky zateplenia fasád"
        description="Realizácie z Hlohovca, Trnavy, Banskej Bystrice a Brezna vrátane jednej video ukážky z pôvodnej galérie."
        legacyItems={ZATEPLENIE_FASADY_REALIZATIONS}
        columns={4}
      />

      {page?.related?.length ? (
        <section className="py-20 md:py-28">
          <div className="mx-auto w-[92%]">
            <AnimateOnScroll>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.26em] text-primary/55">
                Ďalej na webe
              </p>
              <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                Lokality a súvisiace podstránky
              </h2>
            </AnimateOnScroll>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {page.related.map((item, index) => (
                <AnimateOnScroll key={item.href} delay={index * 60}>
                  <Link
                    href={item.href}
                    className="group block rounded-[1.6rem] border border-border bg-light px-6 py-6 transition-all hover:-translate-y-1 hover:border-primary/25 hover:bg-white"
                  >
                    <p className="text-lg font-semibold text-foreground">
                      {item.label}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-foreground/65">
                      {item.description}
                    </p>
                    <span className="mt-5 block whitespace-nowrap text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                      Otvoriť
                    </span>
                  </Link>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <FloatingQuoteButton />
    </>
  );
}

import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error('DATABASE_URL is not defined');
}

const adapter = new PrismaPg({
    connectionString,
});

const prisma = new PrismaClient({
    adapter,
});

type CategoryKey =
    | 'phones'
    | 'playstation'
    | 'watches'
    | 'joysticks'
    | 'earpods'
    | 'laptops';

type SeedBrand = {
    name: string;
    slug: string;
};

type SeedProduct = {
    name: string;
    price: number;
    categoryKey: CategoryKey;
    brandSlug: string;
};

const brands: SeedBrand[] = [
    { name: 'Apple', slug: 'apple' },
    { name: 'Samsung', slug: 'samsung' },
    { name: 'Sony', slug: 'sony' },
    { name: 'Xiaomi', slug: 'xiaomi' },
    { name: 'ASUS', slug: 'asus' },
    { name: 'Lenovo', slug: 'lenovo' },
    { name: 'JBL', slug: 'jbl' },
    { name: 'Microsoft', slug: 'microsoft' },
    { name: 'Dell', slug: 'dell' },
    { name: 'HP', slug: 'hp' },
    { name: 'Logitech', slug: 'logitech' },
];

const products: SeedProduct[] = [
    { name: 'iPhone 15 Pro 256GB', price: 1199, categoryKey: 'phones', brandSlug: 'apple' },
    { name: 'iPhone 15 128GB', price: 899, categoryKey: 'phones', brandSlug: 'apple' },
    { name: 'Samsung Galaxy S24 Ultra', price: 1299, categoryKey: 'phones', brandSlug: 'samsung' },
    { name: 'Samsung Galaxy A55', price: 449, categoryKey: 'phones', brandSlug: 'samsung' },
    { name: 'Xiaomi 14 Pro', price: 799, categoryKey: 'phones', brandSlug: 'xiaomi' },
    { name: 'Xiaomi Redmi Note 13 Pro', price: 329, categoryKey: 'phones', brandSlug: 'xiaomi' },

    { name: 'MacBook Air 13 M3', price: 1099, categoryKey: 'laptops', brandSlug: 'apple' },
    { name: 'MacBook Pro 14 M3 Pro', price: 1999, categoryKey: 'laptops', brandSlug: 'apple' },
    { name: 'ASUS ROG Zephyrus G14', price: 1799, categoryKey: 'laptops', brandSlug: 'asus' },
    { name: 'ASUS Zenbook 14 OLED', price: 999, categoryKey: 'laptops', brandSlug: 'asus' },
    { name: 'Lenovo Legion 5 Pro', price: 1399, categoryKey: 'laptops', brandSlug: 'lenovo' },
    { name: 'Lenovo ThinkPad X1 Carbon', price: 1699, categoryKey: 'laptops', brandSlug: 'lenovo' },
    { name: 'Dell XPS 13 Plus', price: 1399, categoryKey: 'laptops', brandSlug: 'dell' },
    { name: 'HP Spectre x360', price: 1249, categoryKey: 'laptops', brandSlug: 'hp' },

    { name: 'AirPods Pro 2', price: 249, categoryKey: 'earpods', brandSlug: 'apple' },
    { name: 'AirPods 3', price: 179, categoryKey: 'earpods', brandSlug: 'apple' },
    { name: 'Sony WF-1000XM5', price: 299, categoryKey: 'earpods', brandSlug: 'sony' },
    { name: 'Samsung Galaxy Buds 2 Pro', price: 199, categoryKey: 'earpods', brandSlug: 'samsung' },
    { name: 'JBL Live Pro 2', price: 149, categoryKey: 'earpods', brandSlug: 'jbl' },
    { name: 'JBL Tune Beam', price: 99, categoryKey: 'earpods', brandSlug: 'jbl' },

    { name: 'DualSense Wireless Controller White', price: 79, categoryKey: 'joysticks', brandSlug: 'sony' },
    { name: 'DualSense Wireless Controller Black', price: 79, categoryKey: 'joysticks', brandSlug: 'sony' },
    { name: 'Xbox Wireless Controller Carbon Black', price: 69, categoryKey: 'joysticks', brandSlug: 'microsoft' },
    { name: 'Xbox Elite Wireless Controller Series 2', price: 179, categoryKey: 'joysticks', brandSlug: 'microsoft' },
    { name: 'Logitech F710 Wireless Gamepad', price: 49, categoryKey: 'joysticks', brandSlug: 'logitech' },

    { name: 'PlayStation 5 Slim', price: 499, categoryKey: 'playstation', brandSlug: 'sony' },
    { name: 'PlayStation 5 Digital Edition', price: 449, categoryKey: 'playstation', brandSlug: 'sony' },
    { name: 'PlayStation Portal', price: 219, categoryKey: 'playstation', brandSlug: 'sony' },
    { name: 'PlayStation Pulse Elite Headset', price: 149, categoryKey: 'playstation', brandSlug: 'sony' },

    { name: 'Apple Watch Series 9', price: 399, categoryKey: 'watches', brandSlug: 'apple' },
    { name: 'Apple Watch Ultra 2', price: 799, categoryKey: 'watches', brandSlug: 'apple' },
    { name: 'Samsung Galaxy Watch 6', price: 299, categoryKey: 'watches', brandSlug: 'samsung' },
    { name: 'Samsung Galaxy Watch 6 Classic', price: 399, categoryKey: 'watches', brandSlug: 'samsung' },
    { name: 'Xiaomi Watch S3', price: 149, categoryKey: 'watches', brandSlug: 'xiaomi' },
];

function normalize(value: string): string {
    return value.toLowerCase().replaceAll(' ', '').replaceAll('-', '');
}

function getCategoryAliases(categoryKey: CategoryKey): string[] {
    const aliases: Record<CategoryKey, string[]> = {
        phones: ['phone', 'phones'],
        playstation: ['playstation', 'play station', 'ps'],
        watches: ['watch', 'watches', 'digitalwatch', 'digitalwatches', 'digitalw'],
        joysticks: ['joystick', 'joysticks', 'gamepad', 'controller'],
        earpods: ['earpod', 'earpods', 'airpod', 'airpods', 'headphone', 'headphones'],
        laptops: ['laptop', 'laptops', 'notebook', 'notebooks'],
    };

    return aliases[categoryKey].map(normalize);
}

function escapeXml(value: string): string {
    return value
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&apos;');
}

function stringToBytes(value: string): Uint8Array<ArrayBuffer> {
    const encoded = new TextEncoder().encode(value);
    const buffer = new ArrayBuffer(encoded.byteLength);
    const bytes = new Uint8Array(buffer);

    bytes.set(encoded);

    return bytes;
}

function createProductImage(
    productName: string,
    brandName: string,
): Uint8Array<ArrayBuffer> {
    const title = escapeXml(productName);
    const brand = escapeXml(brandName);

    const svg = `
<svg width="900" height="700" viewBox="0 0 900 700" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="900" height="700" rx="48" fill="#0F172A"/>
  <rect x="70" y="70" width="760" height="560" rx="40" fill="#1E293B"/>
  <rect x="135" y="120" width="630" height="350" rx="32" fill="#334155"/>
  <circle cx="220" cy="220" r="58" fill="#38BDF8"/>
  <circle cx="345" cy="220" r="58" fill="#A78BFA"/>
  <circle cx="470" cy="220" r="58" fill="#22C55E"/>
  <rect x="180" y="315" width="540" height="70" rx="24" fill="#475569"/>
  <text x="135" y="535" font-family="Arial, sans-serif" font-size="38" font-weight="700" fill="#F8FAFC">${title}</text>
  <text x="135" y="585" font-family="Arial, sans-serif" font-size="28" font-weight="500" fill="#CBD5E1">${brand}</text>
</svg>
  `;

    return stringToBytes(svg.trim());
}

function createBrandImage(brandName: string): Uint8Array<ArrayBuffer> {
    const brand = escapeXml(brandName);

    const svg = `
<svg width="600" height="400" viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="400" rx="40" fill="#111827"/>
  <rect x="60" y="60" width="480" height="280" rx="32" fill="#1F2937"/>
  <text x="300" y="220" text-anchor="middle" font-family="Arial, sans-serif" font-size="54" font-weight="700" fill="#F9FAFB">${brand}</text>
</svg>
  `;

    return stringToBytes(svg.trim());
}

async function findCategoryId(categoryKey: CategoryKey): Promise<string> {
    const categories = await prisma.category.findMany({
        select: {
            id: true,
            name: true,
            slug: true,
        },
    });

    const aliases = getCategoryAliases(categoryKey);

    const category = categories.find((category) => {
        const name = normalize(category.name);
        const slug = normalize(category.slug);

        return aliases.some((alias) => name.includes(alias) || slug.includes(alias));
    });

    if (!category) {
        throw new Error(
            `Не нашёл категорию для "${categoryKey}". Проверь name/slug в таблице categories.`,
        );
    }

    return category.id;
}

async function upsertBrand(brand: SeedBrand) {
    return prisma.brand.upsert({
        where: {
            slug: brand.slug,
        },
        update: {
            name: brand.name,
            img: createBrandImage(brand.name),
        },
        create: {
            name: brand.name,
            slug: brand.slug,
            img: createBrandImage(brand.name),
        },
    });
}

async function upsertProduct(data: {
    name: string;
    price: number;
    categoryId: string;
    brandId: string;
    brandName: string;
}) {
    const existedProduct = await prisma.product.findFirst({
        where: {
            name: data.name,
        },
        select: {
            id: true,
        },
    });

    const productData = {
        name: data.name,
        price: data.price,
        img: createProductImage(data.name, data.brandName),
        categoryId: data.categoryId,
        brandId: data.brandId,
    };

    if (existedProduct) {
        return prisma.product.update({
            where: {
                id: existedProduct.id,
            },
            data: productData,
        });
    }

    return prisma.product.create({
        data: productData,
    });
}

async function connectBrandToCategory(categoryId: string, brandId: string) {
    const category = await prisma.category.findUnique({
        where: {
            id: categoryId,
        },
        select: {
            brands: {
                where: {
                    id: brandId,
                },
                select: {
                    id: true,
                },
            },
        },
    });

    if (category?.brands.length) {
        return;
    }

    await prisma.category.update({
        where: {
            id: categoryId,
        },
        data: {
            brands: {
                connect: {
                    id: brandId,
                },
            },
        },
    });
}

async function main() {
    console.log('Start seed products...');

    const categoryKeys: CategoryKey[] = [
        'phones',
        'playstation',
        'watches',
        'joysticks',
        'earpods',
        'laptops',
    ];

    const categoryIdByKey = new Map<CategoryKey, string>();

    for (const categoryKey of categoryKeys) {
        const categoryId = await findCategoryId(categoryKey);
        categoryIdByKey.set(categoryKey, categoryId);
    }

    const brandBySlug = new Map<string, Awaited<ReturnType<typeof upsertBrand>>>();

    for (const brand of brands) {
        const savedBrand = await upsertBrand(brand);
        brandBySlug.set(brand.slug, savedBrand);
    }

    for (const product of products) {
        const categoryId = categoryIdByKey.get(product.categoryKey);
        const brand = brandBySlug.get(product.brandSlug);

        if (!categoryId) {
            throw new Error(`Category id not found for key: ${product.categoryKey}`);
        }

        if (!brand) {
            throw new Error(`Brand not found: ${product.brandSlug}`);
        }

        await upsertProduct({
            name: product.name,
            price: product.price,
            categoryId,
            brandId: brand.id,
            brandName: brand.name,
        });

        await connectBrandToCategory(categoryId, brand.id);
    }

    console.log(`Seeded products: ${products.length}`);
    console.log('Seed products finished.');
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });